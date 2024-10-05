import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

const textAnimation = {
	hidden: {
		y: -20,
		opacity: 0,
		rotate: 0.0001,
	},
	visible: {
		y: 0,
		opacity: 1,
		rotate: 0.0001,
		transition: {
			duration: 1.7,
			ease: [0.18, 0.1, 0.25, 1],
			delay: 1,
			opacity: { duration: 1.5, ease: "easeInOut", delay: 1 },
		},
	},
	exit: {
		y: -20,
		opacity: 0,
		rotate: 0.0001,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const LandingParagraphAnimation: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<motion.p
			initial="hidden"
			whileInView="visible"
			exit="exit"
			variants={textAnimation}
			viewport={{ once: true }}
			className="text-base sm:text-lg leading-[1.4rem] sm:leading-[1.575rem] text-balance sm:text-wrap text-center sm:text-left mb-8 sm:mb-0">
			{children}
		</motion.p>
	);
};

export default LandingParagraphAnimation;
