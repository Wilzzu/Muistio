import Search from "../components/home/TopOptions/Search";
import TopOptions from "../components/home/TopOptions/TopOptions";
import { File } from "../types/types";

function Home() {
	// TODO: Save files into store so we don't have to pass them as props
	const files: File[] = [{ id: 1, title: "Title 1", dateModified: new Date(), size: 123 }];

	return (
		<main className="h-[calc(100dvh-4rem)] flex flex-col items-center gap-5">
			<section className="flex flex-col gap-6 w-2/5 p-5">
				<Search />
				<TopOptions files={files} />
			</section>
		</main>
	);
}

export default Home;
