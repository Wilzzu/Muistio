import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { AuthError } from "../types/types";

type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	encryptionKeyChallenge: string | null;
	setEncryptionKeyChallenge: Dispatch<SetStateAction<string | null>>;
	isLoading: boolean;
	error: AuthError;
};

const defaultAuthContext: AuthContextType = {
	user: null,
	setUser: () => {},
	encryptionKeyChallenge: null,
	setEncryptionKeyChallenge: () => {},
	isLoading: true,
	error: { isError: false },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export default AuthContext;
