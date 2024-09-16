/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/authentication/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";
import CreateEncryptionKey from "./components/authentication/CreateEncryptionKey";
import ValidateEncryptionKey from "./components/authentication/ValidateEncryptionKey";
import CreateNewFile from "./features/CreateNewFile/CreateNewFile";
import FilesProvider from "./context/FilesProvider";
import LandingNavbar from "./components/layout/Navbar/LandingNavbar";
import GDPRPopup from "./components/layout/GDPRPopup";
import useClearValues from "./hooks/useClearValues";

const DefaultLayout = () => {
	const navigate = useNavigate();
	return (
		<div className="h-dvh px-2 py-1 overflow-hidden">
			<div className="h-full flex flex-col items-center overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full pb-4">
				<LandingNavbar logoClickFunction={() => navigate("/")} />
				<main className="flex flex-col gap-10 w-full max-w-[800px] pt-3">
					<GDPRPopup />
					<Outlet />
				</main>
			</div>
		</div>
	);
};

const Root = () => {
	const { user, encryptionKeyChallenge, userDataLoading, encryptionKeySet, error } =
		useContext(AuthContext);
	const { clear } = useClearValues();

	// Landing page
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	if (location.pathname === "/")
		return (
			<>
				<GDPRPopup />
				<Outlet />
			</>
		);

	// Return default layout if not on home, file, or settings page
	if (!/(\/home|\/file|\/settings)/.test(location.pathname)) {
		clear(false);
		return <DefaultLayout />;
	}

	// Authentication flow
	const Authentication = () => {
		if (!user) return <Login />;
		if (!encryptionKeyChallenge) return <CreateEncryptionKey />;
		if (!encryptionKeySet) return <ValidateEncryptionKey />;
		return <Outlet />;
	};

	// File manager
	return (
		<FilesProvider>
			<GDPRPopup />
			<NotificationGlobal />
			{queryParams.get("modal") === "new" && <CreateNewFile />}
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
		</FilesProvider>
	);
};

export default Root;
