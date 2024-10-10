import { Link, useNavigate } from "react-router-dom";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";
import Footer from "../components/layout/Footer/Footer";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className="h-dvh px-2 sm:py-1 sm:overflow-hidden">
			<div className="min-h-[calc(100dvh-72px)] sm:min-h-0 sm:h-full flex flex-col items-center overflow-y-scroll sm:scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
				<LandingNavbar logoClickFunction={() => navigate("/")} />
				<main className="flex flex-col gap-4 sm:gap-8 w-full max-w-[800px] pt-8 sm:pt-3 text-center">
					<h1 className="text-3xl sm:text-5xl font-bold">404 - Page Not Found</h1>
					<p className="text-base sm:text-xl">Oops! The page you are looking for does not exist.</p>
					<Link
						to="/"
						className="text-base sm:text-xl text-textAccent underline underline-offset-2">
						Return to the homepage
					</Link>
					<p className="text-xs sm:text-sm">
						If you believe this is an error or have questions, feel free to{" "}
						<a href="mailto:wilzzudev@gmail.com" className="text-textAccent hover:underline">
							contact us
						</a>
						.
					</p>
				</main>
			</div>
			<div className="block sm:hidden">
				<Footer />
			</div>
		</div>
	);
};

export default ErrorPage;
