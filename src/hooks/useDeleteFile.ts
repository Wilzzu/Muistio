import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { deleteFile } from "../firebase/firebase";
import FilesContext from "../context/FilesContext";
import { useNavigate } from "react-router-dom";

const useDeleteFile = (fileId: string) => {
	const { user } = useContext(AuthContext);
	const { selectedFile, setSelectedFile, setFiles } = useContext(FilesContext);
	const navigate = useNavigate();

	const deleteFileById = async () => {
		if (!user?.uid) throw new Error("No user found");
		await deleteFile(user.uid, fileId);
	};

	const { mutate: deleteFileMutation, isPending } = useMutation({
		mutationFn: deleteFileById,
		onSuccess: () => {
			setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
			if (selectedFile?.id === fileId) {
				setSelectedFile(null);
				navigate("/");
			}
			// TODO: Show success notification
		},
		onError: () => {
			console.log("Error while deleting file");
		},
		retry: 2,
	});

	return { deleteFileMutation, isDeleting: isPending };
};

export default useDeleteFile;
