import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";

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

// Firestore functions
const getFileSize = (content: string) => {
	const blob = new Blob([content]);
	return blob.size;
};

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

export const updateFile = async (
	userId: string,
	fileId: string,
	title: string,
	content: string
) => {
	await updateDoc(doc(db, "users", userId, "files", fileId), {
		title,
		dateModified: serverTimestamp(),
		size: getFileSize(content),
		content,
	});
};

export const deleteFile = async (userId: string, fileId: string) => {
	await deleteDoc(doc(db, "users", userId, "files", fileId));
};
