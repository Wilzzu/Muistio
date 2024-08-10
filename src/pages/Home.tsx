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
		<div className="flex justify-center">
			<main className="flex flex-col-reverse lg:flex-row justify-center gap-1 lg:gap-4 xl:gap-10 px-1 w-[clamp(1100px,80%,1600px)]">
				<section className="flex flex-col gap-5 w-full lg:w-1/3 xl:w-1/2 px-3 shrink-0">
					<Search setFilteredList={setFilteredList} />
					<div className="flex flex-col gap-2">
						<TopOptions />
						<ul className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
							<ListFiles filteredList={filteredList} />
						</ul>
					</div>
				</section>

				{selectedFile && <FilePreview key={selectedFile.id} />}
			</main>
		</div>
	);
}

export default Home;
