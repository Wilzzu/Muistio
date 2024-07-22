import { ImSpinner2 } from "react-icons/im";
import Modal from "./Modal";
import { FC, useEffect, useState } from "react";

type LoadingModalProps = {
	content: string;
};

const LoadingModal: FC<LoadingModalProps> = ({ content }) => {
	const [showWarning, setShowWarning] = useState(false);

	// Show warning after 8 seconds
	useEffect(() => {
		const showWarning = setTimeout(() => {
			setShowWarning(true);
		}, 8000);

		return () => clearTimeout(showWarning);
	}, []);

	return (
		<Modal closeModalFunction={() => false}>
			<h1 className="text-center text-lg">
				{content} <ImSpinner2 className="ml-2 animate-spin inline-block" />
			</h1>
			{showWarning && (
				<p className="text-center text-sm text-white/70">
					This is taking longer than expected, try{" "}
					<button
						className="underline hover:text-white duration-200"
						onClick={() => location.reload()}>
						refreshing the page
					</button>
					.
				</p>
			)}
		</Modal>
	);
};

export default LoadingModal;
