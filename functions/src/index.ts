import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();

export const newuser = functions.auth.user().onCreate((user) => {
	// Add metadata for the new user
	admin.firestore().collection("users").doc(user.uid).set({
		encryptionKey: "",
		totalFileSize: 0,
	});
});

export const modifyfile = onDocumentWritten("users/{userId}/files/{fileId}", (event) => {
	if (!event?.data?.before.exists) {
		console.log("Document was created");
		return;
	}

	if (!event?.data?.after.exists) {
		console.log("Document was deleted");
		return;
	}

	const document = event.data.after.data();
	console.log(document);

	const previousValues = event.data.before.data();
	console.log(previousValues);
});
