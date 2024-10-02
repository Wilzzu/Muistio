import { useState } from "react";
import Landing3Note from "../../assets/landing-page/Landing_3_Note.webp";
import useCheckMobile from "../../hooks/useCheckMobile";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import LandingTitleAnimation from "./LandingTitleAnimation";
import ScrollingEncryptedText from "./ScrollingEncryptedText";
import { motion } from "framer-motion";

const textAnimation = {
	hidden: { opacity: 0, y: "-100%", scale: 1, filter: "blur(4px)" },
	visible: (isMobile: boolean) => ({
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 2.4,
			ease: [0.38, 0.39, 0.56, 0.98],
			delay: isMobile ? 1.5 : 0,
			scale: { delay: isMobile ? 1.5 : 0, duration: 2.6, ease: "easeOut" },
			opacity: { delay: isMobile ? 1.5 : 0, duration: 1.2, ease: "easeInOut" },
		},
	}),
	exit: {
		opacity: 0,
		height: 0,
		y: -20,
		filter: "blur(20px)",
		transition: {
			duration: 0.4,
			ease: [0.55, 0.28, 0.88, 0.76],
			opacity: { duration: 0.6, ease: "easeIn" },
		},
	},
};

const noteAnimation = {
	hidden: {
		opacity: 0,
		y: 16,
		scale: 0.9,
		filter: "blur(5px)",
	},
	visible: (isMobile: boolean) => ({
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 1.4,
			delay: isMobile ? 2 : 0,
			ease: [0.17, 0.5, 0.14, 1],
			opacity: { delay: isMobile ? 2 : 0, duration: 0.5, ease: "easeOut" },
		},
	}),
	exit: {
		opacity: 0,
		y: -50,
		scale: 1.05,
		filter: "blur(4px)",
		transition: {
			duration: 0.6,
			ease: [0.55, 0.28, 0.88, 0.76],
			opacity: { duration: 0.5, ease: "easeIn" },
		},
	},
};

const SectionThree = () => {
	const S3Text = () => (
		<>
			<h1 className="text-4xl sm:text-[3.5rem] sm:leading-[3.9rem] font-bold text-center sm:text-left">
				<LandingTitleAnimation
					content={[
						{ text: "Your Files," },
						{ text: "Your Key," },
						{ text: "Your Privacy", highlight: [0, 11] },
					]}
				/>
			</h1>
			<LandingParagraphAnimation>
				Your privacy is non-negotiable. We encrypt your files with a{" "}
				<span className="text-textAccent selection:text-black">key only you know</span>, that is
				never sent to us.
				<br /> <br className="inline-block sm:hidden" />
				No one else <br className="inline-block sm:hidden" /> — <b>not even us</b> —{" "}
				<br className="inline-block sm:hidden" /> can access your files.
			</LandingParagraphAnimation>
		</>
	);

	const S3Image = () => {
		const isMobile = useCheckMobile();
		const [isAnimating, setIsAnimating] = useState(false);

		return (
			<>
				{/* Encryption text */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					exit="exit"
					variants={textAnimation}
					onAnimationStart={() => setIsAnimating(true)}
					custom={isMobile}
					className="absolute h-2/3 sm:h-1/2 w-[76%] sm:-translate-x-2 top-4 sm:top-auto sm:-translate-y-36 z-0 perspective-750">
					<ScrollingEncryptedText />
				</motion.div>

				{/* Note */}
				<motion.img
					initial="hidden"
					animate={isMobile ? (isAnimating ? "visible" : "hidden") : "visible"}
					exit="exit"
					variants={noteAnimation}
					custom={isMobile}
					draggable={false}
					src={Landing3Note}
					className="absolute h-auto bottom-0 sm:bottom-auto w-[70%] sm:w-[58%] translate-x-2 sm:translate-x-0 sm:translate-y-32 object-contain z-[1]"
				/>
			</>
		);
	};

	return { S3Text, S3Image };
};

export default SectionThree;
