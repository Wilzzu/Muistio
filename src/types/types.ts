export type File = {
	id: string;
	title: string;
	dateModified: Date;
	size: number;
};

export type FilteredList = {
	files: File[];
	isSearching: boolean;
};
