/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Login from "./components/authentication/Login";
import LoadingModal from "./components/common/LoadingModal";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import NotificationGlobal from "./components/common/NotificationGlobal";
import CreateEncryptionKey from "./components/authentication/CreateEncryptionKey";
import useIndexedDB from "./hooks/useIndexedDB";

const Root = () => {
	const { user, encryptionKeyChallenge, isLoading, error } = useContext(AuthContext);
	const { getEncryptionKey } = useIndexedDB();
	const [encryptionKeySet, setEncryptionKeySet] = useState(false);

	const checkEncryptionKey = useCallback(async () => {
		const key = await getEncryptionKey();
		setEncryptionKeySet(!!key);
	}, [user]);

	useEffect(() => {
		checkEncryptionKey();
	}, [checkEncryptionKey]);

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
						) : !encryptionKeySet ? (
							<div>Key is not set in IndexedDB</div>
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
