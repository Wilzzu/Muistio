import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateMetadata } from "../firebase/firebase";
import NotificationContext from "../context/NotificationContext";
import { Metadata } from "../types/types";

const useUpdateMetadata = (
	notificationContent: string,
	callback: (updatedObject: Metadata) => void
) => {
	const { user } = useContext(AuthContext);
	const { showNotification } = useContext(NotificationContext);

	const executeUpdateMetadata = async (updateObject: Metadata) => {
		if (!user?.uid) throw new Error("User not found");
		showNotification({ content: `Updating ${notificationContent}...` });
		return await updateMetadata(user.uid, updateObject);
	};

	const onSuccess = (updatedObject: Metadata) => {
		callback(updatedObject);
		showNotification({ content: `${notificationContent} updated!` });
	};

	const { mutate: updateMetadataMutation, isPending } = useMutation({
		mutationFn: (updateObject: Metadata) => executeUpdateMetadata(updateObject),
		onSuccess: (updatedObject: Metadata) => onSuccess(updatedObject),
		onError: (error) =>
			showNotification({
				content: `Error updating ${notificationContent}: ${error?.message}`,
				warning: true,
			}),
		retry: 2,
	});

	return { updateMetadataMutation, isUpdating: isPending };
};

export default useUpdateMetadata;
