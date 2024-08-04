import { Timestamp } from "firebase/firestore";

export type File = {
	id: string;
	title: string;
	dateModified: Timestamp;
	size: number;
	content: string;
};

export type FilteredList = {
	files: File[];
	isSearching: boolean;
};

export type Metadata = {
	encryptionKey?: string;
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
