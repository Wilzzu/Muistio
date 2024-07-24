import { FC, ReactNode, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	auth.onAuthStateChanged((user) => {
		setUser(user);
		setIsLoading(false);
	});

	return (
		<AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
