/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const GDPRPopup = () => {
	const [show, setShow] = useState(false);
	const { getCookie, setCookie } = useCookies();

	// Check if we should show the popup
	useEffect(() => {
		const consent = getCookie("gdprConsent");
		if (!consent) setShow(true);
	}, []);

	const handleAccept = () => {
		setCookie("gdprConsent", "true", 365);
		setShow(false);
	};

	if (!show) return null;

	return (
		// Overflow hidden container
		<div className="fixed sm:absolute w-full h-full flex justify-center left-0 top-0 pointer-events-none overflow-hidden z-[9999]">
			{/* Popup */}
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 55, delay: 0.5 }}
				className="absolute bottom-0 sm:bottom-4 p-[1px] bg-gradient-to-br from-accent via-[#0F364F] to-accent rounded-[9px]">
				<div className="p-3 gap-4 flex bg-gradient-radial from-background to-secondary rounded-lg pointer-events-auto">
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
						<p className="shadow-black/40 drop-shadow-text-sm">
							This site uses cookies to save your preferences. We also use trusted external{" "}
							<br className="hidden sm:inline-block" />
							providers who utilize cookies for secure login functionality and website protection.
						</p>
						{/* Buttons */}
						<span className="flex justify-center sm:gap-2 border-t sm:border-l sm:border-t-0 border-white/50 pt-2 sm:pt-0 sm:pl-3">
							<Link
								to="/privacy-policy#cookies"
								className="w-full sm:w-auto px-2 flex items-center text-nowrap hover:underline underline-offset-2">
								<p className="shadow-black/40 text-white drop-shadow-text-sm w-full sm:w-auto text-center">
									Learn more
								</p>
							</Link>
							<Button
								onClick={handleAccept}
								style={{ border: "w-full sm:w-auto", main: "w-full sm:w-auto" }}>
								Ok, got it!
							</Button>
						</span>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default GDPRPopup;
