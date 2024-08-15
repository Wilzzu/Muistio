import { initializeApp } from "firebase/app";
import { connectAuthEmulator, deleteUser, getAuth, User, UserInfo } from "firebase/auth";
import {
	addDoc,
	collection,
	connectFirestoreEmulator,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	serverTimestamp,
	setDoc,
	Timestamp,
	updateDoc,
	writeBatch,
} from "firebase/firestore";
import { decrypt, encrypt } from "../lib/encryption";
import { EncryptionData } from "../types/types";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (import.meta.env.VITE_MODE === "dev") {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(db, "localhost", 8080);
}
/* --- Metadata --- */
export const getMetadata = async (userId: string) => {
	return await getDoc(doc(db, "users", userId));
};

export const updateMetadata = async (userId: string, fieldObject: EncryptionData) => {
	await updateDoc(doc(db, "users", userId), { encryptionKey: fieldObject });
	return fieldObject;
};

/* --- Files --- */
const getFileSize = (content: string) => {
	const blob = new Blob([content]);
	return blob.size;
};

// Add file metadata and encrypted content
export const createFile = async (
	userId: string,
	title: string,
	content: string,
	encryptionKey: string | null
) => {
	if (!encryptionKey) throw new Error("Encryption key not found");
	// Add file metadata
	const docRef = await addDoc(collection(db, "users", userId, "files"), {
		title,
		dateModified: serverTimestamp(),
		size: getFileSize(content),
	});

	// Encrypt and add file content
	const encrypted = encrypt(content, encryptionKey);
	await setDoc(doc(db, "users", userId, "files", docRef.id, "encrypted", "file"), {
		ciphertext: encrypted.ciphertext,
		salt: encrypted.salt,
		nonce: encrypted.nonce,
	});

	return {
		metadata: {
			id: docRef.id,
			dateModified: Timestamp.now(),
			size: getFileSize(content),
			title,
		},
		content,
	};
};

export const getFiles = async (userId: string) => {
	return await getDocs(collection(db, "users", userId, "files"));
};

export const getFileContent = async (
	userId: string,
	fileId: string,
	encryptionKey: string | null
) => {
	if (!encryptionKey) throw new Error("Encryption key not found");

	const docRef = await getDoc(doc(db, "users", userId, "files", fileId, "encrypted", "file"));
	if (!docRef.exists()) throw new Error("File not found");

	const data = docRef.data();
	const decrypted = decrypt(data.ciphertext, encryptionKey, data.salt, data.nonce);
	return decrypted;
};

// Update file
export type MetadataObject = {
	dateModified: Timestamp;
	title?: string;
	size?: number;
	id?: string;
};

type Content = {
	plaintext: string;
	encrypted: EncryptionData;
};

type UpdateValue = {
	title?: string;
	content?: Content;
};

const createMetadataObject = (updateValue: UpdateValue) => {
	const metadataObject = <MetadataObject>{
		dateModified: serverTimestamp(),
	};
	if (updateValue.title) metadataObject.title = updateValue.title;
	if (updateValue.content) metadataObject.size = getFileSize(updateValue.content.plaintext);
	return metadataObject;
};

export const updateFile = async (userId: string, fileId: string, updateValue: UpdateValue) => {
	// Create metadata object, since it will always be updated
	const metadataObject = createMetadataObject(updateValue);

	// Update content if it exists
	if (updateValue.content)
		await updateDoc(
			doc(db, "users", userId, "files", fileId, "encrypted", "file"),
			updateValue.content.encrypted
		);

	// Update metadata
	await updateDoc(doc(db, "users", userId, "files", fileId), metadataObject);

	// Return updated file metadata and content
	return {
		metadata: { ...metadataObject, dateModified: Timestamp.now(), id: fileId }, // We have to use client's time for this, unless we would need to make a fetch request to get the server time
		content: updateValue?.content?.plaintext,
	};
};

// Delete file
export const deleteFile = async (userId: string, fileId: string) => {
	// Delete encrypted file content
	const encryptedFileRef = doc(db, "users", userId, "files", fileId, "encrypted", "file");
	await deleteDoc(encryptedFileRef);

	// Delete the file document
	return await deleteDoc(doc(db, "users", userId, "files", fileId));
};

// Delete user and all their files
export const deleteUserAndFiles = async (user: User) => {
	const deleteFirestoreData = async (uid: UserInfo["uid"]) => {
		// Get all files
		const userDocRef = doc(db, "users", uid);
		const filesSnapshot = await getDocs(collection(userDocRef, "files"));

		// Start a batch
		let batch = writeBatch(db);
		let batchCount = 0;

		// Commit batch if it's full
		const commitBatchIfFull = async () => {
			if (batchCount === 500) {
				await batch.commit();
				batch = writeBatch(db);
				batchCount = 0;
			}
		};

		// Delete all files and their encrypted content
		for (const fileDoc of filesSnapshot.docs) {
			const encryptedFileRef = doc(fileDoc.ref, "encrypted/file");

			// Delete encrypted file content
			batch.delete(encryptedFileRef);
			batchCount++;
			await commitBatchIfFull();

			// Delete file document
			batch.delete(fileDoc.ref);
			batchCount++;
			await commitBatchIfFull();
		}

		// Delete user document
		batch.delete(userDocRef);
		batchCount++;

		// Commit final batch
		if (batchCount > 0) await batch.commit();
	};

	if (user) {
		try {
			// Delete user's data and files from Firestore
			await deleteFirestoreData(user.uid);

			// Delete the user from Auth
			await deleteUser(user);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	} else throw new Error("User not found, try logging in again");
};
