import { ImSpinner2 } from "react-icons/im";
import Modal from "./Modal";
import { FC, useEffect, useState } from "react";
import { AuthError } from "../../types/types";

type LoadingModalProps = {
	content: string;
	error: AuthError;
};

const RefreshLink = () => (
	<button className="underline hover:text-white duration-200" onClick={() => location.reload()}>
		refreshing the page
	</button>
);

const LoadingModal: FC<LoadingModalProps> = ({ content, error }) => {
	const [showWarning, setShowWarning] = useState(false);

	// Show warning after 8 seconds
	useEffect(() => {
		const showWarning = setTimeout(() => {
			setShowWarning(true);
		}, 8000);

		return () => clearTimeout(showWarning);
	}, []);

	return (
		<Modal
			styleOverride={error.isError ? "from-red-500 via-red-600/60 to-red-500" : ""}
			closeModalFunction={() => false}>
			{error.isError ? (
				<>
					<h1 className="text-center text-lg text-warning font-semibold">
						Oops! An error occurred.
					</h1>
					<p className="text-center text-sm text-white/70">Error: "{error.message}"</p>
					<p className="text-center text-sm text-white/70 mt-4">
						Try <RefreshLink />.
					</p>
				</>
			) : (
				<>
					<h1 className="text-center text-lg">
						{content} <ImSpinner2 className="ml-2 animate-spin inline-block" />
					</h1>
					{showWarning && (
						<p className="text-center text-sm text-white/70">
							This is taking longer than expected, try <RefreshLink />.
						</p>
					)}
				</>
			)}
		</Modal>
	);
};

export default LoadingModal;
