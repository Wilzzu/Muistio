import Landing3Note from "../../assets/landing-page/Landing_3_Note.webp";
import LandingParagraphAnimation from "./LandingParagraphAnimation";
import LandingTitleAnimation from "./LandingTitleAnimation";
import ScrollingEncryptedText from "./ScrollingEncryptedText";

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
			<div className="absolute h-1/2 w-[76%] -translate-x-2 -translate-y-36 z-0 perspective-750">
				<ScrollingEncryptedText />
			</div>
			{/* Note */}
			<img
				draggable={false}
				src={Landing3Note}
				className="absolute h-auto w-[58%] translate-y-32 object-contain z-[1]"
			/>
		</>
	);

	return { S3Text, S3Image };
};

export default SectionThree;
