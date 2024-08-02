import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";

type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	encryptionKeyChallenge: string | null;
	isLoading: boolean;
};

const defaultAuthContext: AuthContextType = {
	user: null,
	setUser: () => {},
	encryptionKeyChallenge: null,
	isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export default AuthContext;
