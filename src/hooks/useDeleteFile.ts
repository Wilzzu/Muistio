import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { deleteFile } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";
import { useNavigate } from "react-router-dom";

const useDeleteFile = (fileId: string | undefined) => {
	const { user } = useContext(AuthContext);
	const { selectedFile, setSelectedFile, setFiles } = useContext(FilesContext);
	const navigate = useNavigate();

	const executeDeleteFile = async () => {
		if (!user?.uid) throw new Error("User not found");
		if (!fileId) throw new Error("File not found");
		await deleteFile(user.uid, fileId);
	};

	const onSuccess = () => {
		setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
		if (selectedFile?.id === fileId) {
			setSelectedFile(null);
			navigate("/");
		}
		// TODO: Show success notification
	};

	const { mutate: deleteFileMutation, isPending } = useMutation({
		mutationFn: executeDeleteFile,
		onSuccess: () => onSuccess(),
		onError: (error) => {
			console.error("Error while deleting file", error.message);
		},
		retry: 2,
	});

	return { deleteFileMutation, isDeleting: isPending };
};

export default useDeleteFile;
