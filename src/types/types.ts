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
