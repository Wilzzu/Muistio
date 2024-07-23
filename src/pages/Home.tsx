import { useState } from "react";
import ListFiles from "../components/home/ListFiles/ListFiles";
import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { FilteredList } from "../types/types";
import FilePreview from "../features/FilePreview/FilePreview";

function Home() {
	const [filteredList, setFilteredList] = useState<FilteredList>({
		files: [],
		isSearching: false,
	});

	return (
		<div className="flex justify-center gap-2 px-1">
			<main className="flex flex-col gap-5 w-1/2 px-3">
				<Search setFilteredList={setFilteredList} />
				<div className="flex flex-col gap-2">
					<TopOptions />
					<ListFiles filteredList={filteredList} />
				</div>
			</main>

			<FilePreview />
		</div>
	);
}

export default Home;
