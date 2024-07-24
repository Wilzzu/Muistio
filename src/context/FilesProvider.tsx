import { FC, ReactNode, useState } from "react";
import { File } from "../types/types";
import FilesContext from "./FilesContext";

const FilesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	return (
		<FilesContext.Provider value={{ files, setFiles, selectedFile, setSelectedFile }}>
			{children}
		</FilesContext.Provider>
	);
};

export default FilesProvider;
