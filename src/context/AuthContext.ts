import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { AuthError, Metadata } from "../types/types";

type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	encryptionKeyChallenge: Metadata | null;
	setEncryptionKeyChallenge: Dispatch<SetStateAction<Metadata | null>>;
	userDataLoading: boolean;
	setUserDataLoading: Dispatch<SetStateAction<boolean>>;
	encryptionKeySet: boolean;
	setEncryptionKeySet: Dispatch<SetStateAction<boolean>>;
	error: AuthError;
};

const defaultAuthContext: AuthContextType = {
	user: null,
	setUser: () => {},
	encryptionKeyChallenge: null,
	setEncryptionKeyChallenge: () => {},
	userDataLoading: true,
	setUserDataLoading: () => {},
	encryptionKeySet: false,
	setEncryptionKeySet: () => {},
	error: { isError: false },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export default AuthContext;
