/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import ListFiles from "../components/home/ListFiles/ListFiles";
import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { FilteredList } from "../types/types";
import FilePreview from "../features/FilePreview/FilePreview";
import FilesContext from "../context/FilesContext";
import { useParams } from "react-router-dom";

function Home() {
	const { fileId } = useParams();
	const [filteredList, setFilteredList] = useState<FilteredList>({
		files: [],
		isSearching: false,
	});
	const { files, selectedFile, setSelectedFile } = useContext(FilesContext);

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
		<div className="flex justify-center gap-2 px-1">
			<main className="flex flex-col gap-5 w-1/2 px-3">
				<Search setFilteredList={setFilteredList} />
				<div className="flex flex-col gap-2">
					<TopOptions />
					<ListFiles filteredList={filteredList} />
				</div>
			</main>

			{selectedFile && <FilePreview key={selectedFile.id} />}
		</div>
	);
}

export default Home;
