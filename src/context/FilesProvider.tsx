/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect, useState } from "react";
import { File } from "../types/types";
import FilesContext from "./FilesContext";
import { useParams } from "react-router-dom";

const FilesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [selectedSort, setSelectedSort] = useState<number>(1);
	const { fileId } = useParams();

	// Select a file if URL contains a file ID
	useEffect(() => {
		if (fileId && files) {
			if (fileId === selectedFile?.id) return;
			const foundFile = files.find((file) => fileId === file.id);
			if (!foundFile) return setSelectedFile(null);
			setSelectedFile(foundFile);
		} else if (!fileId && files) return setSelectedFile(null);
	}, [fileId, files]);

	return (
		<FilesContext.Provider
			value={{ files, setFiles, selectedFile, setSelectedFile, selectedSort, setSelectedSort }}>
			{children}
		</FilesContext.Provider>
	);
};

export default FilesProvider;
