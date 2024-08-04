import { FC, ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "firebase/auth";
import { auth, getMetadata } from "../firebase/firebase";
import { AuthError } from "../types/types";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [encryptionKeyChallenge, setEncryptionKeyChallenge] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<AuthError>({ isError: false });

	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async (user) => {
			try {
				setUser(user);
				// Get metadata if user is logged in
				if (user) {
					const metadata = await getMetadata(user.uid);
					if (metadata.exists()) {
						const data = metadata.data();

						// Set encryption key challenge if user has one
						if (data?.encryptionKey && data?.encryptionKey.length > 0) {
							setEncryptionKeyChallenge(data.encryptionKey);
						}
					}
				}
			} catch (error) {
				let errorMsg = "Unknown error";
				if (error instanceof Error) errorMsg = error.message;
				setError({ isError: true, message: errorMsg });
			}
			setIsLoading(false);
		});

		return authListener;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				encryptionKeyChallenge,
				setEncryptionKeyChallenge,
				isLoading,
				error,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
