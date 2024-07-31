import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type ModalProps = {
	closeModalFunction: () => void;
	styleOverride?: string;
	children: ReactNode;
};

const Modal: FC<ModalProps> = ({ closeModalFunction, styleOverride, children }) => {
	const portalRoot = document.getElementById("modal-root");
	const mainRef = useRef<HTMLDivElement>(null);
	const focusRef = useRef<HTMLButtonElement>(null);
	useClickOutside(mainRef, closeModalFunction);

	// Focus to a hidden button inside the modal
	useEffect(() => {
		if (focusRef?.current) focusRef.current.focus();
	}, [focusRef]);

	return createPortal(
		// Dark background
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 z-[100]">
			{/* Border container */}
			<motion.div
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				ref={mainRef}
				className={cn(
					"p-[1px] w-full max-w-[600px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/60 to-primaryHighlight rounded-[13px] shadow-black/60 shadow-centered-lg mr-2",
					styleOverride
				)}>
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
			</motion.div>
		</motion.div>,
		portalRoot || document.body
	);
};

export default Modal;
