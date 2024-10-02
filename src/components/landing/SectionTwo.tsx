import Landing2Note from "../../assets/landing-page/Landing_2_Note.webp";
import Landing2CloudMain from "../../assets/landing-page/Landing_2_Cloud_Main.webp";
import Landing2CloudLeft from "../../assets/landing-page/Landing_2_Cloud_Left.webp";
import Landing2CloudRight from "../../assets/landing-page/Landing_2_Cloud_Right.webp";
import LandingTitleAnimation from "./LandingTitleAnimation";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import { motion } from "framer-motion";
import useCheckMobile from "../../hooks/useCheckMobile";
import { useState } from "react";

type AnimationProps = {
	cloud?: boolean;
	isMobile?: boolean;
};

const imageAnimation = {
	hidden: ({ cloud = false, isMobile }: AnimationProps) => ({
		opacity: 0,
		y: cloud ? (isMobile ? -60 : -100) : 16,
		scale: 0.9,
		filter: "blur(5px)",
	}),
	visible: ({ cloud = false, isMobile }: AnimationProps) => ({
		opacity: 1,
		y: 0,
		rotate: 0.001,
		scale: 1,
		filter: "blur(0)",
		transition: {
			duration: 1.4,
			delay: isMobile ? 1.5 : 0,
			ease: [0.17, 0.5, 0.14, 1],
			opacity: { delay: isMobile ? 1.5 : 0, duration: cloud ? 1 : 0.5, ease: "easeOut" },
		},
	}),
	exit: ({ cloud = false, isMobile }: AnimationProps) => ({
		opacity: 0,
		y: cloud ? 50 : -50,
		scale: 1.05,
		filter: "blur(4px)",
		transition: {
			duration: 0.6,
			delay: isMobile ? 1.5 : 0,
			ease: [0.55, 0.28, 0.88, 0.76],
			opacity: { delay: isMobile ? 1.5 : 0, duration: 0.5, ease: "easeIn" },
		},
	}),
};

const SectionTwo = () => {
	const S2Text = () => (
		<>
			<h1 className="text-4xl sm:text-[3.5rem] sm:leading-[3.9rem] font-bold text-center sm:text-left">
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

	const S2Image = () => {
		const isMobile = useCheckMobile();
		const [isAnimating, setIsAnimating] = useState(false);

		return (
			<>
				{/* Cloud */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					exit="exit"
					variants={imageAnimation}
					onAnimationStart={() => setIsAnimating(true)}
					custom={{ cloud: true, isMobile }}
					className="relative w-full h-full flex items-center justify-center">
					<div className="absolute h-auto w-[90%] sm:w-[76%] z-0 animate-cloud-main-mobile sm:animate-cloud-main">
						<img
							draggable={false}
							src={Landing2CloudMain}
							className="h-auto w-full object-contain"
						/>
						<img
							draggable={false}
							src={Landing2CloudLeft}
							className="absolute top-[82px] sm:top-[132px] left-[38px] sm:left-[61px] h-auto w-[34%] object-contain animate-cloud-left"
						/>
						<img
							draggable={false}
							src={Landing2CloudRight}
							className="absolute top-[70px] sm:top-[112px] right-[25px] sm:right-[44px] h-auto w-[32%] object-contain animate-cloud-right"
						/>
					</div>
				</motion.div>
				{/* Note */}
				<motion.img
					initial="hidden"
					animate={isMobile ? (isAnimating ? "visible" : "hidden") : "visible"}
					exit="exit"
					variants={imageAnimation}
					custom={{ isMobile }}
					draggable={false}
					src={Landing2Note}
					className="absolute h-auto bottom-0 sm:bottom-auto w-[75%] sm:w-[65%] sm:translate-y-36 translate-x-6 sm:translate-x-0 object-contain z-[1]"
				/>
			</>
		);
	};

	return { S2Text, S2Image };
};

export default SectionTwo;
