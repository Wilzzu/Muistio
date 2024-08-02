import { FC, ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "firebase/auth";
import { addMetadata, auth, getMetadata } from "../firebase/firebase";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [encryptionKeyChallenge, setEncryptionKeyChallenge] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			setUser(user);

			// Get user metadata if they are logged in
			if (user) {
				const metadata = await getMetadata(user.uid);
				if (metadata.exists()) {
					const data = metadata.data();

					// Add default metadata if user doesn't have metadata yet
					// if (!Object.keys(data).length) return await addMetadata(user.uid);

					// Set encryption key challenge
					if (data?.encryptionKey && data?.encryptionKey.length > 0) {
						setEncryptionKeyChallenge(data.encryptionKey);
					}
				} else await addMetadata(user.uid);
			}

			setIsLoading(false);
		});

		return () => setIsLoading(true);
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, encryptionKeyChallenge, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
