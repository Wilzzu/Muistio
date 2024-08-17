import Landing2Note from "../../assets/landing-page/Landing_2_Note.webp";
import Landing2CloudMain from "../../assets/landing-page/Landing_2_Cloud_Main.webp";
import Landing2CloudLeft from "../../assets/landing-page/Landing_2_Cloud_Left.webp";
import Landing2CloudRight from "../../assets/landing-page/Landing_2_Cloud_Right.webp";

const SectionTwo = () => {
	const S2Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				<span className="text-accent selection:text-black">10MB</span> of
				<br /> Cloud Storage
				<br /> for{" "}
				<span className="relative">
					Free
					<span className="absolute bottom-0 left-0 w-full h-[6px] bg-accent rounded-full animate-underline" />
				</span>
			</h1>
			<p className="text-lg leading-[1.575rem]">
				That's more space than what's needed for the entire{" "}
				<span className="text-[#21aeff] selection:text-black">Lord of the Rings</span> and{" "}
				<span className="text-[#21aeff] selection:text-black">Harry Potter</span> book series,{" "}
				<i>combined</i>.
			</p>
		</>
	);

	const S2Image = () => (
		<>
			{/* Cloud */}
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
			{/* Note */}
			<img
				draggable={false}
				src={Landing2Note}
				className="absolute h-auto w-[65%] translate-y-36 object-contain z-[1]"
			/>
		</>
	);

	return { S2Text, S2Image };
};

export default SectionTwo;
