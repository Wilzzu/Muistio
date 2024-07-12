import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../../hooks/useClickOutside";

type ModalProps = {
	closeModalFunction: () => void;
	children: ReactNode;
};

const Modal: FC<ModalProps> = ({ closeModalFunction, children }) => {
	const portalRoot = document.getElementById("root");
	const mainRef = useRef<HTMLElement>(null);
	const focusRef = useRef<HTMLButtonElement>(null);
	useClickOutside(mainRef, closeModalFunction);

	// Focus to a hidden button inside the modal
	useEffect(() => {
		if (focusRef?.current) focusRef.current.focus();
	}, [focusRef]);

	return createPortal(
		// Dark background
		<div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 z-[999]">
			{/* Border container */}
			<section
				ref={mainRef}
				className="p-[1px] w-full max-w-[600px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/60 to-primaryHighlight rounded-[13px] shadow-black/60 shadow-centered-lg mr-2">
				{/* Hidden button so we can bring focus to the modal */}
				<button
					ref={focusRef}
					tabIndex={-1}
					aria-hidden="true"
					className="absolute -left-[9999px]"
				/>
				{/* Content */}
				<div className="flex flex-col p-6 bg-gradient-radial from-secondary from-50% to-primary rounded-xl">
					{children}
				</div>
			</section>
		</div>,
		portalRoot || document.body
	);
};

export default Modal;
