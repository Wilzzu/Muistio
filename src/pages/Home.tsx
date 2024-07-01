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
	];

	return (
		<main className="h-[calc(100dvh-4rem)] flex flex-col items-center gap-5">
			{/* Sidebar */}
			{/* <div></div> */}

			{/* File selection */}
			<section className="flex flex-col gap-8 w-2/5 p-5">
				<Search />
				<div className="flex flex-col gap-2">
					<TopOptions files={files} />
					<ListFiles files={files} />
				</div>
			</section>

			{/* File preview */}
			{/* <div></div> */}
		</main>
	);
}

export default Home;
