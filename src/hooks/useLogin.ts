import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
const useLogin = () => {
	const provider = new GoogleAuthProvider();

	const login = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				if (!credential) return;
			})
			.catch((error) => {
				console.error(error.code, error.message);
			});
	};

	return { login };
};

export default useLogin;
