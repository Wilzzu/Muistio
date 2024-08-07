import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateMetadata } from "../firebase/firebase";
import NotificationContext from "../context/NotificationContext";
import { EncryptionData } from "../types/types";

const useUpdateMetadata = (
	notificationContent: string,
	callback: (updatedObject: EncryptionData) => void
) => {
	const { user } = useContext(AuthContext);
	const { showNotification } = useContext(NotificationContext);

	const executeUpdateMetadata = async (updateObject: EncryptionData) => {
		if (!user?.uid) throw new Error("User not found");
		showNotification({ content: `Updating ${notificationContent}...` });
		return await updateMetadata(user.uid, updateObject);
	};

	const onSuccess = (updatedObject: EncryptionData) => {
		callback(updatedObject);
		showNotification({ content: `${notificationContent} updated!` });
	};

	const { mutate: updateMetadataMutation, isPending } = useMutation({
		mutationFn: (updateObject: EncryptionData) => executeUpdateMetadata(updateObject),
		onSuccess: (updatedObject: EncryptionData) => onSuccess(updatedObject),
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
