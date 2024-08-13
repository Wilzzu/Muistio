import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { deleteUserAndFiles } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../context/NotificationContext";
import useClearValues from "./useClearValues";

const useDeleteAccountAndFiles = () => {
	const { user } = useContext(AuthContext);
	const { showNotification } = useContext(NotificationContext);
	const { clear } = useClearValues();
	const navigate = useNavigate();

	const executeDeleteAccountAndFiles = async () => {
		if (!user?.uid) throw new Error("User not found");
		showNotification({
			content: "Deleting Account and Files, please wait...",
			disableAutoHide: true,
		});
		await deleteUserAndFiles(user);
	};

	const onSuccess = () => {
		showNotification({ content: "Account and Files successfully deleted!" });
		clear();
		navigate("/home");
	};

	const { mutate: deleteFileMutation, isPending } = useMutation({
		mutationFn: executeDeleteAccountAndFiles,
		onSuccess: () => onSuccess(),
		onError: (error) => {
			showNotification({ content: `Error: ${error?.message}`, warning: true });
		},
		retry: 2,
	});

	return { deleteFileMutation, isDeleting: isPending };
};

export default useDeleteAccountAndFiles;
