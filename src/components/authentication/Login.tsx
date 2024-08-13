import Button from "../common/Button";
import { FaGoogle } from "react-icons/fa";
import Modal from "../common/Modal";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const { login } = useLogin();

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
