import { createContext, Dispatch, SetStateAction } from "react";
import { File } from "../types/types";

type FilesContextType = {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
};

const defaultFilesContext: FilesContextType = {
	files: [],
	setFiles: () => {},
};

const FilesContext = createContext<FilesContextType>(defaultFilesContext);

export default FilesContext;
