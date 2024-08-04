import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/authentication/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";
import CreateEncryptionKey from "./components/authentication/CreateEncryptionKey";

const Root = () => {
	const { user, encryptionKeyChallenge, isLoading, error } = useContext(AuthContext);

	return (
		<>
			<NotificationGlobal />
			<Navbar />
			{/* Container for main height and padding */}
			<div className="h-[calc(100dvh-4rem)] p-2">
				{/* Page content container with custom scrollbar */}
				<div className="h-full overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
					{/* Show content depending on loading, login and metadata state */}
					{isLoading || error.isError ? (
						<LoadingModal content={"Loading user data"} error={error} />
					) : user ? (
						!encryptionKeyChallenge ? (
							<CreateEncryptionKey />
						) : (
							<Outlet />
						)
					) : (
						<Login />
					)}
				</div>
			</div>
		</>
	);
};

export default Root;
