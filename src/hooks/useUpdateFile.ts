import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateFile, UpdateObjectType } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";

const useUpdateFile = (callback: () => void) => {
	const { user } = useContext(AuthContext);
	const { setFiles } = useContext(FilesContext);

	const executeUpdateFile = async (fileId: string, title?: string, content?: string) => {
		if (!user?.uid) throw new Error("User not found");
		return await updateFile(user?.uid, fileId, title, content);
	};

	// Update the files list with the updated object's values
	const onSuccess = (updatedObject: UpdateObjectType) => {
		setFiles((prevFiles) => {
			return prevFiles.map((file) => {
				if (file.id === updatedObject.id) return { ...file, ...updatedObject };
				return file;
			});
		});

		// Used for example clearing renameValue in FileButton.tsx
		callback();

		// TODO: Show success notification
	};

	const { mutate: updateFileMutation, isPending } = useMutation({
		mutationFn: ({
			fileId,
			title,
			content,
		}: {
			fileId: string;
			title?: string;
			content?: string;
		}) => executeUpdateFile(fileId, title, content),
		onSuccess: (updatedObject) => onSuccess(updatedObject),
		onError: (error) => {
			console.error("Error while updating file", error.message);
		},
		retry: 2,
	});

	return { updateFileMutation, isUpdating: isPending };
};

export default useUpdateFile;
