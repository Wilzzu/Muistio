/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect, useState } from "react";
import { File } from "../types/types";
import FilesContext from "./FilesContext";

const FilesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [selectedSort, setSelectedSort] = useState<number>(1);

	// When files get updated, update the selectedFile with latest values
	useEffect(() => {
		if (selectedFile) {
			const updatedFile = files.find((file) => file.id === selectedFile.id);
			if (!updatedFile) return;
			console.log("updated,", updatedFile.title);
			setSelectedFile(updatedFile);
		}
	}, [files]);

	return (
		<FilesContext.Provider
			value={{ files, setFiles, selectedFile, setSelectedFile, selectedSort, setSelectedSort }}>
			{children}
		</FilesContext.Provider>
	);
};

export default FilesProvider;
