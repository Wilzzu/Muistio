/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import NotificationContext from "../../context/NotificationContext";

const NotificationGlobal = () => {
	const portalRoot = document.getElementById("notification-root");
	const { content, warning, isVisible } = useContext(NotificationContext);
	const [showPortal, setShowPortal] = useState(isVisible);

	// Create portal when notification should fire
	useEffect(() => {
		if (isVisible) return setShowPortal(true);
	}, [isVisible]);

	return showPortal
		? createPortal(
				<div className="fixed inset-[4.5rem_0] w-full h-fit flex justify-center z-[200] pointer-events-none">
					{/* Remove portal when animation exits and no notification should be showing */}
					<AnimatePresence mode="wait" onExitComplete={() => !isVisible && setShowPortal(false)}>
						{isVisible && (
							// Border container
							<motion.div
								key={content}
								initial={{ y: -10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -5, opacity: 0, transition: { type: "tween", duration: 0.2 } }}
								transition={{
									y: { type: "spring", damping: 22, stiffness: 500 },
								}}
								className="bg-gradient-to-br from-[#5AB7FF] via-[#0794FF] to-[#5AB7FF] p-[2px] rounded-[14px] shadow-accent/30 shadow-centered-sm">
								{/* Content */}
								<div className="p-3 px-6 bg-gradient-radial from-[#077bff] from-40% to-accent text-sm font-semibold drop-shadow-md rounded-xl">
									<p className="shadow-black/40 drop-shadow-text-sm">{content}</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>,
				portalRoot || document.body
		  )
		: null;
};

export default NotificationGlobal;
