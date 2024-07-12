import ListFiles from "../components/home/ListFiles/ListFiles";
import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { File } from "../types/types";

function Home() {
	// TODO: Save files into store so we don't have to pass them as props
	const files: File[] = [
		{ id: 123, title: "Title 1", dateModified: new Date(), size: 123 },
		{ id: 234, title: "Title 2", dateModified: new Date(), size: 345 },
		{ id: 345, title: "Title 3", dateModified: new Date(), size: 678 },
		{ id: 456, title: "Title 4", dateModified: new Date(), size: 91011 },
		{ id: 567, title: "Title 5", dateModified: new Date(), size: 121314 },
		{ id: 678, title: "Title 6", dateModified: new Date(), size: 151617 },
		{ id: 789, title: "Title 7", dateModified: new Date(), size: 181920 },
		{ id: 890, title: "Title 8", dateModified: new Date(), size: 212223 },
		{ id: 901, title: "Title 9", dateModified: new Date(), size: 242526 },
		{ id: 101, title: "Title 10", dateModified: new Date(), size: 272829 },
		{ id: 112, title: "Title 11", dateModified: new Date(), size: 303132 },
		{ id: 113, title: "Title 12", dateModified: new Date(), size: 333435 },
		{ id: 114, title: "Title 13", dateModified: new Date(), size: 363738 },
		{ id: 115, title: "Title 14", dateModified: new Date(), size: 394041 },
		{ id: 116, title: "Title 15", dateModified: new Date(), size: 424344 },
		{ id: 117, title: "Title 16", dateModified: new Date(), size: 454647 },
		{ id: 118, title: "Title 17", dateModified: new Date(), size: 484950 },
		{ id: 119, title: "Title 18", dateModified: new Date(), size: 515253 },
		{ id: 120, title: "Title 19", dateModified: new Date(), size: 545556 },
		{ id: 121, title: "Title 20", dateModified: new Date(), size: 575859 },
	];

	return (
		<>
			{/* Sidebar */}
			{/* <div></div> */}

			{/* File selection */}
			<section className="flex flex-col gap-8 w-2/5 p-3">
				<Search />
				<div className="flex flex-col gap-2">
					<TopOptions files={files} />
					<ListFiles files={files} />
				</div>
			</section>

			{/* File preview */}
			{/* <div></div> */}
		</>
	);
}

export default Home;
