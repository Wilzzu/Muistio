import { Link, useNavigate } from "react-router-dom";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className="h-dvh px-2 py-1 overflow-hidden">
			<div className="h-dvh flex flex-col items-center overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
				<LandingNavbar logoClickFunction={() => navigate("/")} />
				<main className="flex flex-col gap-8 w-full max-w-[800px] pt-3 text-center">
					<h1 className="text-5xl font-bold">404 - Page Not Found</h1>
					<p className="text-xl">Oops! The page you are looking for does not exist.</p>
					<Link to="/" className="text-xl text-textAccent underline underline-offset-2">
						Return to the homepage
					</Link>
					<p className="text-sm">
						If you believe this is an error or have questions, feel free to{" "}
						<a href="mailto:wilzzudev@gmail.com" className="text-textAccent hover:underline">
							contact us
						</a>
						.
					</p>
				</main>
			</div>
		</div>
	);
};

export default ErrorPage;
