import { Dispatch, SetStateAction } from "react";
import Landing1Note from "../../assets/landing-page/Landing_1_Note.webp";
import LandingEditor from "./LandingEditor";
import LandingTitleAnimation from "./LandingTitleAnimation";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import { motion } from "framer-motion";

const imageAnimation = {
	hidden: (mult = 1) => ({ opacity: 0, y: 16 * mult, scale: 0.9, filter: "blur(5px)" }),
	visible: {
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 1.4,
			ease: [0.17, 0.5, 0.14, 1],
			opacity: { duration: 1, ease: "easeOut" },
		},
	},
	exit: (mult = 1) => ({
		opacity: 0,
		y: -50 * mult,
		scale: 1.05,
		filter: "blur(4px)",
		transition: {
			duration: 0.6,
			ease: [0.55, 0.28, 0.88, 0.76],
			opacity: { duration: 0.5, ease: "easeIn" },
		},
	}),
};

const SectionOne = (setHasInteracted: Dispatch<SetStateAction<boolean>>) => {
	const S1Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				<LandingTitleAnimation
					content={[
						{ text: "Your Ideas,", highlight: [0, 9] },
						{ text: "Secured &" },
						{ text: "Formatted" },
					]}
				/>
			</h1>
			<LandingParagraphAnimation>
				Create and edit text files with Muistio Markdown editor, perfect for{" "}
				<span className="text-textAccent selection:text-black">quick notes</span> or{" "}
				<span className="text-textAccent selection:text-black">detailed documents</span>. All files
				are encrypted locally and stored in the cloud.
			</LandingParagraphAnimation>
		</>
	);

	const S1Image = () => (
		<>
			{/* Editor */}
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageAnimation}
				custom={-1}
				className="relative h-full w-full flex items-center justify-center z-0 perspective-750 overflow-hidden">
				<div className="absolute -translate-y-12 right-2 w-[74%] scale-x-[95%] rotate-x-12 rotate-y-[20deg] -rotate-z-6 transform-gpu">
					<LandingEditor setHasInteracted={setHasInteracted} />
				</div>
			</motion.div>
			{/* Note */}
			<motion.img
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageAnimation}
				draggable={false}
				src={Landing1Note}
				className="absolute h-auto w-[60%] -translate-x-16 translate-y-36 object-contain z-[1] pointer-events-none"
			/>
		</>
	);

	return { S1Text, S1Image };
};

export default SectionOne;
