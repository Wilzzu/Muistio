import { createContext, Dispatch, SetStateAction } from "react";
import { File } from "../types/types";

type FilesContextType = {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
	selectedFile: File | null;
	setSelectedFile: Dispatch<SetStateAction<File | null>>;
};

const defaultFilesContext: FilesContextType = {
	files: [],
	setFiles: () => {},
	selectedFile: null,
	setSelectedFile: () => {},
};

const FilesContext = createContext<FilesContextType>(defaultFilesContext);

export default FilesContext;
