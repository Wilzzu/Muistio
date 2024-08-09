/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/authentication/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";
import CreateEncryptionKey from "./components/authentication/CreateEncryptionKey";
import ValidateEncryptionKey from "./components/authentication/ValidateEncryptionKey";
import CreateNewFile from "./features/CreateNewFile/CreateNewFile";

const Root = () => {
	const { user, encryptionKeyChallenge, userDataLoading, encryptionKeySet, error } =
		useContext(AuthContext);

	// Landing page
	const location = useLocation();
	if (location.pathname === "/") return <Outlet />;

	// Authentication flow
	const Authentication = () => {
		if (!user) return <Login />;
		if (!encryptionKeyChallenge) return <CreateEncryptionKey />;
		if (!encryptionKeySet) return <ValidateEncryptionKey />;
		return <Outlet />;
	};

	// File manager
	return (
		<>
			<NotificationGlobal />
			{location.hash === "#new" && <CreateNewFile />}
			<Navbar />
			{/* Container for main height and padding */}
			<div className="h-[calc(100dvh-4rem)] p-2">
				{/* Page content container with custom scrollbar */}
				<div className="h-full overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full outline-none">
					{userDataLoading || error.isError ? (
						<LoadingModal content={"Loading user data"} error={error} />
					) : (
						<Authentication />
					)}
				</div>
			</div>
		</>
	);
};

export default Root;
