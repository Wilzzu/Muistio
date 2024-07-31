import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./pages/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";

const Root = () => {
	const { user, isLoading } = useContext(AuthContext);

	return (
		<>
			<NotificationGlobal />
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
		</>
	);
};

export default Root;
