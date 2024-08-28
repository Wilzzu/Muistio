import Landing1Note from "../../assets/landing-page/Landing_1_Note.webp";
import LandingEditor from "./LandingEditor";

const SectionOne = () => {
	const S1Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				<span className="text-accent selection:text-black">Your Ideas</span>, Secured & Formatted
			</h1>
			<p className="text-lg leading-[1.575rem]">
				Create and edit text files with Muistio Markdown editor, perfect for{" "}
				<span className="text-[#21aeff] selection:text-black">quick notes</span> or{" "}
				<span className="text-[#21aeff] selection:text-black">detailed documents</span>. All files
				are encrypted locally and stored in the cloud.
			</p>
		</>
	);

	const S1Image = () => (
		<>
			{/* Editor */}
			<div className="relative h-full w-full flex items-center justify-center z-0 perspective-750 overflow-hidden shadow-accent/15 drop-shadow-centered-2xl ">
				<div className="absolute -translate-y-12 right-2 w-[74%] scale-x-[95%] rotate-x-12 rotate-y-[20deg] -rotate-z-6 transform-gpu">
					<LandingEditor />
				</div>
			</div>
			{/* Note */}
			<img
				draggable={false}
				src={Landing1Note}
				className="absolute h-auto w-[60%] -translate-x-16 translate-y-36 object-contain z-[1] pointer-events-none"
			/>
		</>
	);

	return { S1Text, S1Image };
};

export default SectionOne;
