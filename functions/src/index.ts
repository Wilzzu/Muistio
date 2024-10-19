import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as functions from "firebase-functions/v1";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const userMetadata = (userId: string) => {
	return getFirestore().collection("users").doc(userId);
};

// Add metadata for new user
export const newuser = functions
	.region("europe-west1")
	.auth.user()
	.onCreate((user) => {
		userMetadata(user.uid).set({
			encryptionKey: {},
			totalFileSize: 0,
		});
	});

/*
 * Update totalFileSize in user metadata when a file is added, deleted or the content is updated
 */
export const modifyfile = onDocumentWritten(
	{
		document: "users/{userId}/files/{fileId}/encrypted/file",
		region: "europe-north1",
	},
	async (event) => {
		const eventData = event?.data;
		const newData = eventData?.after.data();
		const oldData = eventData?.before.data();

		// Check if user exists
		const userId = event.params.userId;
		const userDoc = await userMetadata(userId).get();
		if (!userDoc.exists) return null;

		// New document
		if (!oldData && newData) {
			return userMetadata(userId).update({
				totalFileSize: FieldValue.increment(newData.ciphertext.length + 304), // Add 304 bytes to make up for other fields in the document
			});
		}

		// Deleted document
		if (!newData && oldData) {
			return userMetadata(userId).update({
				totalFileSize: FieldValue.increment(-(oldData.ciphertext.length + 304)),
			});
		}

		// Content updated in document
		if (newData && oldData && newData.ciphertext !== oldData.ciphertext) {
			const sizeDiff = newData.ciphertext.length - oldData.ciphertext.length;
			if (sizeDiff === 0) return;

			userMetadata(userId).update({
				totalFileSize: FieldValue.increment(sizeDiff),
			});
		}

		return null;
	}
);
