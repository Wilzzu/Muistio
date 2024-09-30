import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { AuthError, EncryptionData } from "../types/types";

type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	encryptionKeyChallenge: EncryptionData | null;
	setEncryptionKeyChallenge: Dispatch<SetStateAction<EncryptionData | null>>;
	userDataLoading: boolean;
	setUserDataLoading: Dispatch<SetStateAction<boolean>>;
	encryptionKeySet: boolean;
	setEncryptionKeySet: Dispatch<SetStateAction<boolean>>;
	storageSize: number;
	updateStorageSize: (clear?: boolean) => Promise<void>;
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
	storageSize: 0,
	updateStorageSize: async () => {},
	error: { isError: false },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export default AuthContext;
