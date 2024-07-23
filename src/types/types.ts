export type File = {
	id: string;
	title: string;
	dateModified: Date;
	size: number;
	content: string;
};

export type FilteredList = {
	files: File[];
	isSearching: boolean;
};
