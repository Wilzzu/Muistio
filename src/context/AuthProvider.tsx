/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "firebase/auth";
import { auth, getMetadata } from "../firebase/firebase";
import { AuthError, EncryptionData } from "../types/types";
import useIndexedDB from "../hooks/useIndexedDB";

type Metadata = {
	encryptionKey: EncryptionData;
	totalFileSize: number;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [encryptionKeyChallenge, setEncryptionKeyChallenge] = useState<EncryptionData | null>(null);
	const [userDataLoading, setUserDataLoading] = useState(true);
	const [encryptionKeySet, setEncryptionKeySet] = useState(false);
	const [storageSize, setStorageSize] = useState(0);
	const [error, setError] = useState<AuthError>({ isError: false });
	const { getEncryptionKey } = useIndexedDB();

	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async (user) => {
			setUserDataLoading(true);
			try {
				setUser(user);
				// Get metadata if user is logged in
				if (user) {
					const metadata = await getMetadata(user.uid);
					if (metadata.exists()) {
						const data = metadata.data() as Metadata;

						// Set encryption key challenge if user has one
						if (data?.encryptionKey && Object.keys(data?.encryptionKey).length > 0) {
							setEncryptionKeyChallenge(data.encryptionKey);
						}

						// Set encryptionKeySet if one is found in IndexedDB
						const key = await getEncryptionKey();
						setEncryptionKeySet(!!key);

						// Set storage size
						setStorageSize(data?.totalFileSize || 0);
					}
				}
			} catch (error) {
				let errorMsg = "Unknown error";
				if (error instanceof Error) errorMsg = error.message;
				setError({ isError: true, message: errorMsg });
			}
			setUserDataLoading(false);
		});

		return authListener;
	}, []);

	const updateStorageSize = async (clear: boolean = false) => {
		if (clear) setStorageSize(0);
		if (!user) return;

		setTimeout(async () => {
			const metadata = await getMetadata(user?.uid);

			if (metadata.exists()) {
				const data = metadata.data() as Metadata;
				setStorageSize(data?.totalFileSize || 0);
			}
		}, 1000);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				encryptionKeyChallenge,
				setEncryptionKeyChallenge,
				userDataLoading,
				setUserDataLoading,
				encryptionKeySet,
				setEncryptionKeySet,
				storageSize,
				updateStorageSize,
				error,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
