import { FC, ReactNode, useEffect, useState } from "react";
import { File } from "../types/types";
import FilesContext from "./FilesContext";
import MockFilesData from "../mocks/MockFilesData.json";

const FilesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [files, setFiles] = useState<File[]>([]);

	// Fetch files from backend
	useEffect(() => {
		const fetchFiles = async () => {
			// Using mock data for now
			const data: File[] = MockFilesData.map((file) => ({
				...file,
				dateModified: new Date(file.dateModified),
			}));

			setFiles(data);
		};

		fetchFiles();
	}, []);

	return <FilesContext.Provider value={{ files, setFiles }}>{children}</FilesContext.Provider>;
};

export default FilesProvider;
