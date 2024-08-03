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
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { Metadata } from "../types/types";

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
export const addMetadata = async (userId: string) => {
	return await addDoc(collection(db, "users", userId, "metadata"), {
		encryptionKey: "",
		totalFileSize: 0,
	});
};

export const getMetadata = async (userId: string) => {
	return await getDoc(doc(db, "users", userId));
};

export const updateMetadata = async (userId: string, updateObject: Metadata) => {
	return await updateDoc(doc(db, "users", userId, "metadata"), updateObject);
};

/* --- Files --- */
const getFileSize = (content: string) => {
	const blob = new Blob([content]);
	return blob.size;
};

// Add file
export const addFile = async (userId: string, title: string, content: string) => {
	const docRef = await addDoc(collection(db, "users", userId, "files"), {
		title,
		dateModified: serverTimestamp(),
		size: getFileSize(content),
		content,
	});
	return docRef.id;
};

export const getFiles = async (userId: string) => {
	return await getDocs(collection(db, "users", userId, "files"));
};

// Update file
export type UpdateObjectType = {
	dateModified: Timestamp;
	title?: string;
	content?: string;
	size?: number;
	id?: string;
};

const createUpdateObject = (title?: string, content?: string) => {
	const updateObject = <UpdateObjectType>{
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
