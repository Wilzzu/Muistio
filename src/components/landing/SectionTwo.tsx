import Landing2Note from "../../assets/landing-page/Landing_2_Note.webp";
import Landing2CloudMain from "../../assets/landing-page/Landing_2_Cloud_Main.webp";
import Landing2CloudLeft from "../../assets/landing-page/Landing_2_Cloud_Left.webp";
import Landing2CloudRight from "../../assets/landing-page/Landing_2_Cloud_Right.webp";
import LandingTitleAnimation from "./LandingTitleAnimation";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import { motion } from "framer-motion";

const imageAnimation = {
	hidden: (cloud = false) => ({
		opacity: 0,
		y: cloud ? -200 : 16,
		scale: 0.9,
		filter: "blur(5px)",
	}),
	visible: (cloud = false) => ({
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 1.4,
			ease: [0.17, 0.5, 0.14, 1],
			opacity: { duration: cloud ? 1 : 0.5, ease: "easeOut" },
		},
	}),
	exit: (cloud = false) => ({
		opacity: 0,
		y: cloud ? 50 : -50,
		scale: 1.05,
		filter: "blur(4px)",
		transition: {
			duration: 0.6,
			ease: [0.55, 0.28, 0.88, 0.76],
			opacity: { duration: 0.5, ease: "easeIn" },
		},
	}),
};

const SectionTwo = () => {
	const S2Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				<LandingTitleAnimation
					content={[
						{ text: "10MB of", highlight: [0, 4] },
						{ text: "Cloud Storage" },
						{ text: "for Free", underline: "Free" },
					]}
				/>
			</h1>
			<LandingParagraphAnimation>
				That's enough space to store the entire
				<br />
				<span className="text-textAccent selection:text-black">Lord of the Rings</span> and{" "}
				<span className="text-textAccent selection:text-black">Harry Potter</span> book series,
				<br />
				<i>combined</i>.
			</LandingParagraphAnimation>
		</>
	);

	const S2Image = () => (
		<>
			{/* Cloud */}
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageAnimation}
				custom={true}
				className="relative w-full h-full flex items-center justify-center">
				<div className="absolute h-auto w-[76%] z-0 animate-cloud-main">
					<img draggable={false} src={Landing2CloudMain} className="h-auto w-full object-contain" />
					<img
						draggable={false}
						src={Landing2CloudLeft}
						className="absolute top-[132px] left-[61px] h-auto w-[34%] object-contain animate-cloud-left"
					/>
					<img
						draggable={false}
						src={Landing2CloudRight}
						className="absolute top-[112px] right-[44px] h-auto w-[32%] object-contain animate-cloud-right"
					/>
				</div>
			</motion.div>
			{/* Note */}
			<motion.img
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageAnimation}
				draggable={false}
				src={Landing2Note}
				className="absolute h-auto w-[65%] translate-y-36 object-contain z-[1]"
			/>
		</>
	);

	return { S2Text, S2Image };
};

export default SectionTwo;
