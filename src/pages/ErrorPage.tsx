import Navbar from "../components/layout/Navbar/Navbar";

const ErrorPage = () => {
	return (
		<>
			<Navbar />
			<main className="h-[calc(100dvh-4rem)] flex flex-col items-center justify-center gap-5 p-4 font-bold">
				<h1>Oops! Page not found 😟 </h1>
			</main>
		</>
	);
};

export default ErrorPage;
