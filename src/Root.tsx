import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import FilesProvider from "./context/FilesProvider";

const Root = () => {
	return (
		<FilesProvider>
			<Navbar />
			{/* Container for main height and padding */}
			<div className="h-[calc(100dvh-4rem)] p-2">
				{/* Page content container with custom scrollbar */}
				<div className="h-full overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
					<Outlet />
				</div>
			</div>
		</FilesProvider>
	);
};

export default Root;
