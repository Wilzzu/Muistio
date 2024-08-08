import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createFile } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";
import NotificationContext from "../context/NotificationContext";
import useIndexedDB from "./useIndexedDB";
import { useNavigate } from "react-router-dom";
import { File } from "../types/types";

const useCreateFile = (callback: () => void) => {
	const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
	const { user } = useContext(AuthContext);
	const { setSelectedFile } = useContext(FilesContext);
	const { showNotification } = useContext(NotificationContext);
	const { getEncryptionKey } = useIndexedDB();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	type NewFile = {
		metadata: File;
		content: string;
	};

	const onSuccess = (newFile: NewFile) => {
		queryClient.invalidateQueries({ queryKey: ["files", user?.uid] });
		queryClient.setQueryData(["fileContent", newFile.metadata.id], newFile.content);
		setSelectedFile(newFile.metadata);
		navigate(`/file/${newFile.metadata.id}`);
		showNotification({ content: "File created successfully!" });
		callback();
	};

	const onError = (reset: () => void) => {
		if (errorTimeout) clearTimeout(errorTimeout);
		const timeout = setTimeout(() => {
			reset();
		}, 6000);
		setErrorTimeout(timeout);
	};

	// Use React Query to keep track of mutation state
	const {
		mutate: createFileMutation,
		isPending,
		isError,
		error,
		reset,
	} = useMutation({
		mutationFn: async ({
			userId,
			title,
			content,
		}: {
			userId: string;
			title: string;
			content: string;
		}) => createFile(userId, title, content, await getEncryptionKey()),
		onSuccess: (newFile: NewFile) => onSuccess(newFile),
		onError: (): void => onError(reset),
	});

	return { createFileMutation, isPending, isError, error };
};

export default useCreateFile;