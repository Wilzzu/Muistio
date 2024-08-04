import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

admin.initializeApp();

const userMetadata = (userId: string) => {
	return admin.firestore().collection("users").doc(userId);
};

const getFileSize = (content: string) => {
	const blob = new Blob([content]);
	return blob.size;
};

// Add metadata for new user
export const newuser = functions.auth.user().onCreate((user) => {
	userMetadata(user.uid).set({
		encryptionKey: "",
		totalFileSize: 0,
	});
});

/*
 * Update totalFileSize in user metadata when a file is added, deleted or the content is updated
 */
export const modifyfile = onDocumentWritten("users/{userId}/files/{fileId}", async (event) => {
	const eventData = event?.data;
	const newData = eventData?.after.data();
	const oldData = eventData?.before.data();

	// New document
	if (!oldData && newData) {
		const newFileSize = getFileSize(newData.content) + 128; // Add 128 bytes to make up for other fields in the document

		// Update metadata
		return userMetadata(event.params.userId).update({
			totalFileSize: FieldValue.increment(newFileSize),
		});
	}

	// Deleted document
	if (!newData && oldData) {
		return userMetadata(event.params.userId).update({
			totalFileSize: FieldValue.increment(-(getFileSize(oldData.content) + 128)),
		});
	}

	// Content updated in document
	if (newData && oldData && newData.content !== oldData.content) {
		const sizeDiff = getFileSize(newData.content) - getFileSize(oldData.content);
		if (sizeDiff === 0) return;

		userMetadata(event.params.userId).update({
			totalFileSize: FieldValue.increment(sizeDiff),
		});
	}

	return null;
});
