import {
	onDocumentCreatedWithAuthContext,
	onDocumentWrittenWithAuthContext,
} from "firebase-functions/v2/firestore";

export const createfile = onDocumentCreatedWithAuthContext(
	"users/{userId}/files/{fileId}",
	(event) => {
		const snapshot = event.data;
		if (!snapshot) {
			console.log("No data associated with the event");
			return;
		}
		const data = snapshot.data();
		console.log(data);
	}
);

export const modifyfile = onDocumentWrittenWithAuthContext(
	"users/{userId}/file/{fileId}",
	(event) => {
		if (!event?.data?.after.exists) {
			console.log("Document was deleted");
			return;
		}
		const document = event.data.after.data();
		console.log(document);

		const previousValues = event.data.before.data();
		console.log(previousValues);
	}
);
