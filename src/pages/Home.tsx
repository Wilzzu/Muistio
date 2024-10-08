/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import ListFiles from "../components/home/ListFiles/ListFiles";
import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { FilteredList } from "../types/types";
import FilePreview from "../features/FilePreview/FilePreview";
import FilesContext from "../context/FilesContext";

function Home() {
	const { files, selectedFile } = useContext(FilesContext);
	const [filteredList, setFilteredList] = useState<FilteredList>({
		files: files,
		isSearching: false,
	});

	return (
		<div className="flex justify-center">
			<main className="flex flex-col-reverse lg:flex-row justify-center gap-1 lg:gap-4 xl:gap-10 px-1 w-full lg:w-[clamp(1100px,80%,1600px)]">
				<section className="flex flex-col gap-5 w-full lg:w-1/3 xl:w-1/2 shrink-0 min-h-[360px]">
					<Search setFilteredList={setFilteredList} />
					<div className="flex flex-col gap-2 sm:px-3">
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
