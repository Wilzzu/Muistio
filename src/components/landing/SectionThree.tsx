import Landing3Note from "../../assets/landing-page/Landing_3_Note.webp";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import LandingTitleAnimation from "./LandingTitleAnimation";
import ScrollingEncryptedText from "./ScrollingEncryptedText";
import { motion } from "framer-motion";

const textAnimation = {
	hidden: { opacity: 0, y: "-100%", scale: 1, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 2.4,
			ease: [0.38, 0.39, 0.56, 0.98],
			scale: { duration: 2.6, ease: "easeOut" },
			opacity: { duration: 1.2, ease: "easeInOut" },
		},
	},
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
	visible: {
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 1.4,
			ease: [0.17, 0.5, 0.14, 1],
			opacity: { duration: 0.5, ease: "easeOut" },
		},
	},
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
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
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
				<span className="text-[#21aeff] selection:text-black">key only you know</span>, that is
				never sent to us.
				<br />
				No one else — <b>not even us</b> — can access your files.
			</LandingParagraphAnimation>
		</>
	);

	const S3Image = () => (
		<>
			{/* Encryption text */}
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={textAnimation}
				className="absolute h-1/2 w-[76%] -translate-x-2 -translate-y-36 z-0 perspective-750">
				<ScrollingEncryptedText />
			</motion.div>

			{/* Note */}
			<motion.img
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={noteAnimation}
				draggable={false}
				src={Landing3Note}
				className="absolute h-auto w-[58%] translate-y-32 object-contain z-[1]"
			/>
		</>
	);

	return { S3Text, S3Image };
};

export default SectionThree;
