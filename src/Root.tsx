import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import FilesProvider from "./context/FilesProvider";

const Root = () => {
	return (
		<FilesProvider>
			<Navbar />
			{/* Container for main height and padding */}
			<div className="h-[calc(100dvh-4rem)] p-2">
				{/* Main content with custom scrollbar */}
				<main className="h-full overflow-y-scroll flex flex-col items-center gap-5 scrollbar-thin scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
					<Outlet />
				</main>
			</div>
		</FilesProvider>
	);
};

export default Root;
