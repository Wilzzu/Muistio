import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
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
} from "firebase/firestore";
import { Metadata } from "../types/types";
import { decrypt, encrypt } from "../lib/encryption";

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

if (import.meta.env.DEV === true) {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(db, "localhost", 8080);
}
/* --- Metadata --- */
export const getMetadata = async (userId: string) => {
	return await getDoc(doc(db, "users", userId));
};

export const updateMetadata = async (userId: string, fieldObject: Metadata) => {
	await updateDoc(doc(db, "users", userId), { encryptionKey: fieldObject });
	return fieldObject;
};

/* --- Files --- */
const getFileSize = (content: string) => {
	const blob = new Blob([content]);
	return blob.size;
};

// Add file metadata and encrypted content
export const addFile = async (
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
		content: encrypted.ciphertext,
		salt: encrypted.salt,
		nonce: encrypted.nonce,
	});

	return docRef.id;
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
	if (!docRef.exists()) return null;

	const data = docRef.data();
	const decrypted = decrypt(data.content, encryptionKey, data.salt, data.nonce);
	return decrypted;
};

// Update file
export type UpdateFileObjectType = {
	dateModified: Timestamp;
	title?: string;
	content?: string;
	size?: number;
	id?: string;
};

const createUpdateObject = (title?: string, content?: string) => {
	const updateObject = <UpdateFileObjectType>{
		dateModified: serverTimestamp(),
	};
	if (title) updateObject.title = title;
	if (content) {
		updateObject.content = content;
		updateObject.size = getFileSize(content);
	}
	return updateObject;
};

export const updateFile = async (
	userId: string,
	fileId: string,
	title?: string,
	content?: string
) => {
	const updateObject = createUpdateObject(title, content);
	await updateDoc(doc(db, "users", userId, "files", fileId), updateObject);
	return { ...updateObject, dateModified: Timestamp.now(), id: fileId }; // We have to use client's time for this, unless we would need to make a fetch request to get the server time
};

// Delete file
export const deleteFile = async (userId: string, fileId: string) => {
	return await deleteDoc(doc(db, "users", userId, "files", fileId));
};
