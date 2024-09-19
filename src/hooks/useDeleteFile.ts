import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { deleteFile } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../context/NotificationContext";

const useDeleteFile = (fileId: string | undefined) => {
	const { user, updateStorageSize } = useContext(AuthContext);
	const { selectedFile, setSelectedFile, setFiles } = useContext(FilesContext);
	const { showNotification } = useContext(NotificationContext);
	const navigate = useNavigate();

	const executeDeleteFile = async () => {
		if (!user?.uid) throw new Error("User not found");
		if (!fileId) throw new Error("File not found");
		showNotification({ content: "Deleting file...", disableAutoHide: true });
		return await deleteFile(user.uid, fileId);
	};

	const onSuccess = () => {
		setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
		updateStorageSize();
		if (selectedFile?.id === fileId) {
			setSelectedFile(null);
			navigate("/home");
		}
		showNotification({ content: "File deleted!" });
	};

	const { mutate: deleteFileMutation, isPending } = useMutation({
		mutationFn: executeDeleteFile,
		onSuccess: () => onSuccess(),
		onError: (error) => {
			showNotification({ content: `Error deleting file: ${error?.message}`, warning: true });
		},
		retry: 2,
	});

	return { deleteFileMutation, isDeleting: isPending };
};

export default useDeleteFile;
