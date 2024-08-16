import Landing3Note from "../../assets/landing-page/Landing_3_Note.webp";
import Landing3CloudMain from "../../assets/landing-page/Landing_3_Cloud_Main.webp";
import Landing3CloudLeft from "../../assets/landing-page/Landing_3_Cloud_Left.webp";
import Landing3CloudRight from "../../assets/landing-page/Landing_3_Cloud_Right.webp";

const SectionThree = () => {
	const S3Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				<span className="text-accent selection:text-black">10MB</span> of
				<br /> Cloud Storage
				<br /> for{" "}
				<span className="relative">
					free
					<span className="absolute bottom-0 left-0 w-full h-[6px] bg-accent rounded-full animate-underline" />
				</span>
			</h1>
			<p className="text-lg leading-[1.575rem]">
				That's more space than what's needed for the entire{" "}
				<span className="text-accent selection:text-black">Lord of the Rings</span> and{" "}
				<span className="text-accent selection:text-black">Harry Potter</span> book series,{" "}
				<i>combined</i>.
			</p>
		</>
	);

	const S3Image = () => (
		<>
			{/* Cloud */}
			<div className="absolute h-auto w-[76%] z-0 animate-cloud-main">
				<img draggable={false} src={Landing3CloudMain} className="h-auto w-full object-contain" />
				<img
					draggable={false}
					src={Landing3CloudLeft}
					className="absolute top-[132px] left-[61px] h-auto w-[34%] object-contain animate-cloud-left"
				/>
				<img
					draggable={false}
					src={Landing3CloudRight}
					className="absolute top-[112px] right-[44px] h-auto w-[32%] object-contain animate-cloud-right"
				/>
			</div>
			{/* Note */}
			<img
				draggable={false}
				src={Landing3Note}
				className="absolute h-auto w-[65%] translate-y-36 object-contain z-[1]"
			/>
		</>
	);

	return { S3Text, S3Image };
};

export default SectionThree;
