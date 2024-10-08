/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/authentication/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";
import CreateEncryptionKey from "./components/authentication/CreateEncryptionKey";
import ValidateEncryptionKey from "./components/authentication/ValidateEncryptionKey";
import CreateNewFile from "./features/CreateNewFile/CreateNewFile";
import FilesProvider from "./context/FilesProvider";
import LandingNavbar from "./components/layout/Navbar/LandingNavbar";
import GDPRPopup from "./components/layout/GDPRPopup";
import useClearValues from "./hooks/useClearValues";
import Footer from "./components/layout/Footer/Footer";

const DefaultLayout = () => {
	const navigate = useNavigate();
	return (
		<div className="sm:h-dvh px-2 sm:py-1 sm:overflow-hidden">
			<div className="h-full flex flex-col items-center overflow-y-scroll sm:scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full pb-4">
				<LandingNavbar logoClickFunction={() => navigate("/")} />
				<main className="flex flex-col gap-10 w-full sm:max-w-[800px] pt-3">
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

	// Clear values if user isn't in the app
	useEffect(() => {
		if (!/(\/home|\/file|\/settings)/.test(location.pathname)) clear(false);
	}, [location.pathname, clear]);

	if (location.pathname === "/") {
		return (
			<>
				<GDPRPopup />
				<Outlet />
			</>
		);
	}

	// Return default layout if user isn't in the app
	if (!/(\/home|\/file|\/settings)/.test(location.pathname)) return <DefaultLayout />;

	// Authentication flow
	const App = () => {
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
			<div className="min-h-[calc(100dvh-80px-80px)] sm:min-h-0 sm:h-[calc(100dvh-4rem)] p-2">
				{/* Page content container with custom scrollbar */}
				<div className="relative h-full overflow-y-scroll overflow-x-hidden sm:scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full outline-none">
					{userDataLoading || error.isError ? (
						<LoadingModal content={"Loading user data"} error={error} />
					) : (
						<App />
					)}
				</div>
			</div>
			<div className="block sm:hidden">
				<Footer marginTop={24} />
			</div>
		</FilesProvider>
	);
};

export default Root;
