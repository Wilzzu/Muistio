import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Button from "../common/Button";
import { FaGoogle } from "react-icons/fa";
import Modal from "../common/Modal";

const Login = () => {
	const provider = new GoogleAuthProvider();

	const login = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				if (!credential) return;
				console.log(credential);
			})
			.catch((error) => {
				console.error(error.code, error.message);
			});
	};

	return (
		<Modal closeModalFunction={() => false}>
			<section className="flex flex-col items-center justify-center gap-8">
				<div className="text-center">
					<h1 className="font-bold text-3xl">Welcome to Muistio!</h1>
					<p>Sign in to continue</p>
				</div>
				<Button highlight onClick={login} style={{ main: "bg-opacity-80" }}>
					<FaGoogle /> Sign in with Google
				</Button>
			</section>
		</Modal>
	);
};

export default Login;
