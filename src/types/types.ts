import { Timestamp } from "firebase/firestore";

export type File = {
	id: string;
	title: string;
	dateModified: Timestamp;
	size: number;
	isUploading?: boolean;
};

export type FilteredList = {
	files: File[];
	isSearching: boolean;
};

export type EncryptionData = {
	ciphertext: string;
	salt: string;
	nonce: string;
};

export type ShowNotificationProps = {
	content: string;
	warning?: boolean;
	disableAutoHide?: boolean;
};

export type AuthError = {
	isError: boolean;
	message?: string;
};
