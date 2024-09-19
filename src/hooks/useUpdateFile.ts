import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FILE_PADDING, UpdatedObject, updateFile } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";
import NotificationContext from "../context/NotificationContext";
import useIndexedDB from "./useIndexedDB";
import { encrypt } from "../lib/encryption";
import { EncryptionData } from "../types/types";

type Title = {
	title: string;
	content?: never;
};

type Content = {
	content: string;
	title?: never;
};

type UpdateProps = {
	fileId: string;
	value: Title | Content;
};

const useUpdateFile = (callback: () => void) => {
	const { user, updateStorageSize } = useContext(AuthContext);
	const { setFiles } = useContext(FilesContext);
	const { showNotification } = useContext(NotificationContext);
	const { getEncryptionKey } = useIndexedDB();
	const queryClient = useQueryClient();

	const executeUpdateFile = async ({ fileId, value }: UpdateProps) => {
		showNotification({ content: "Updating file..." });
		let encryptedContent: EncryptionData | null = null;
		if (!user?.uid) throw new Error("User not found");

		// Encrypt the content if it exists
		if (value.content) {
			const encryptionKey = await getEncryptionKey();
			if (!encryptionKey) throw new Error("Encryption key not found");
			encryptedContent = encrypt(value.content, encryptionKey);
			// 1MB max size - 304 bytes for other fields
			if (encryptedContent.ciphertext.length > 1_000_000 - FILE_PADDING) {
				throw new Error("File size exceeds 1MB limit");
			}
		}

		// Update the file
		if (value.content && encryptedContent) {
			return await updateFile(user?.uid, fileId, {
				content: { plaintext: value.content, encrypted: encryptedContent },
			});
		}
		if (value.title) return await updateFile(user?.uid, fileId, { title: value.title });
		throw new Error("Invalid update value");
	};

	// Update files list and query cache with the updated file
	const onSuccess = (updatedObject: UpdatedObject) => {
		// Update files list with latest metadata
		setFiles((prevFiles) => {
			return prevFiles.map((file) => {
				if (file.id === updatedObject.metadata.id) return { ...file, ...updatedObject.metadata };
				return file;
			});
		});

		// Update content in the query cache
		if (updatedObject.content) {
			queryClient.setQueryData(["fileContent", updatedObject.metadata.id], updatedObject.content);
		}

		// Update storage size
		if (updatedObject.fileSizeUpdated) updateStorageSize();

		// Used for example clearing renameValue in FileButton.tsx
		callback();

		showNotification({ content: "File updated!" });
	};

	const { mutate: updateFileMutation, isPending } = useMutation({
		mutationFn: ({ fileId, value }: UpdateProps) => executeUpdateFile({ fileId, value }),
		onSuccess: (updatedObject) => onSuccess(updatedObject),
		onError: (error) =>
			showNotification({ content: `Error updating file: ${error?.message}`, warning: true }),
		retry: 2,
	});

	return { updateFileMutation, isUpdating: isPending };
};

export default useUpdateFile;
