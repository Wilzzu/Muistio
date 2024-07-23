import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import FilesProvider from "./context/FilesProvider";
import { auth } from "./firebase/firebase";
import { useState } from "react";
import { User } from "firebase/auth";
import Login from "./pages/Login";
import LoadingModal from "./components/common/LoadingModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Root = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const queryClient = new QueryClient();

	// Check if user is logged in before showing content
	auth.onAuthStateChanged((user) => {
		setUser(user);
		setIsLoading(false);
	});

	return (
		<QueryClientProvider client={queryClient}>
			<FilesProvider>
				<Navbar />
				{/* Container for main height and padding */}
				<div className="h-[calc(100dvh-4rem)] p-2">
					{/* Page content container with custom scrollbar */}
					<div className="h-full overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
						{/* Show content depending on loading and login state */}
						{isLoading ? (
							<LoadingModal content={"Loading user data"} />
						) : user ? (
							<Outlet />
						) : (
							<Login />
						)}
					</div>
				</div>
			</FilesProvider>
		</QueryClientProvider>
	);
};

export default Root;
