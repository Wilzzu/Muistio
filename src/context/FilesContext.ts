import { createContext, Dispatch, SetStateAction } from "react";
import { File } from "../types/types";

type FilesContextType = {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
	selectedFile: File | null;
	setSelectedFile: Dispatch<SetStateAction<File | null>>;
	selectedSort: number;
	setSelectedSort: Dispatch<SetStateAction<number>>;
};

const defaultFilesContext: FilesContextType = {
	files: [],
	setFiles: () => {},
	selectedFile: null,
	setSelectedFile: () => {},
	selectedSort: 1,
	setSelectedSort: () => {},
};

const FilesContext = createContext<FilesContextType>(defaultFilesContext);

export default FilesContext;
