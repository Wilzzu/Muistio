import { useState } from "react";
import ListFiles from "../components/home/ListFiles/ListFiles";
import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { FilteredList } from "../types/types";

function Home() {
	const [filteredList, setFilteredList] = useState<FilteredList>({
		files: [],
		isSearching: false,
	});

	return (
		<>
			{/* Sidebar */}
			{/* <div></div> */}

			{/* File selection */}
			<section className="flex flex-col gap-8 w-2/5 p-3">
				<Search setFilteredList={setFilteredList} />
				<div className="flex flex-col gap-2">
					<TopOptions />
					<ListFiles filteredList={filteredList} />
				</div>
			</section>

			{/* File preview */}
			{/* <div></div> */}
		</>
	);
}

export default Home;
