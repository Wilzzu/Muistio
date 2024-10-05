import Button from "../common/Button";
import { FaGoogle } from "react-icons/fa";
import Modal from "../common/Modal";
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
	const { login } = useLogin();

	return (
		<Modal closeModalFunction={() => false}>
			<section className="flex flex-col items-center justify-center gap-8">
				<div className="text-center">
					<h1 className="font-bold text-2xl sm:text-3xl">Welcome to Muistio!</h1>
					<p className="text-sm sm:text-base">Sign in to continue</p>
				</div>
				<Button highlight onClick={login} style={{ main: "bg-opacity-80 text-sm" }}>
					<FaGoogle /> Sign in with Google
				</Button>
				<p className="text-[0.76rem] leading-tight text-white/50">
					By continuing, you agree to Muistio's <br />
					<Link to="/terms-of-service" className="text-textAccent hover:underline">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link to="/privacy-policy" className="text-textAccent hover:underline">
						Privacy Policy
					</Link>
					.
				</p>
			</section>
		</Modal>
	);
};

export default Login;
