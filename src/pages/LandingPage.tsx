import { useState } from "react";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";
import { Link } from "react-router-dom";
import ButtonTexture from "../assets/landing-page/Landing_Button_Texture.webp";

const LandingPage = () => {
	const [activeSection, setActiveSection] = useState(0);

	return (
		<div className="h-dvh flex flex-col items-center">
			<LandingNavbar />
			<main className="w-[1200px] h-[calc(100dvh-4rem)] grid grid-cols-5">
				<section className="flex flex-col justify-center gap-8 px-4 col-span-2 bg-neutral-900">
					{/* Change the content depending on active section */}
					<h1 className="text-5xl leading-[3.6rem] font-bold">
						<span className="text-accent">10MB</span> of <br /> Cloud Storage
					</h1>
					<p className="text-lg leading-[1.575rem]">
						{/* Alternative: That's more space than you'd need for storing the entire*/}
						That's more space than what's needed for the entire{" "}
						<span className="text-accent">Lord of the Rings</span> and{" "}
						<span className="text-accent">Harry Potter</span> book series, <i>combined</i>.
					</p>
					{/* Animated Button */}
					<Link
						to="/home"
						className="group w-fit p-[1px] bg-gradient-radial from-transparent bg-accent/20 hover:bg-accent/50 from-20% to-accent rounded-[9px] shadow-accent/20 hover:shadow-accent/50 shadow-centered hover:scale-105 duration-300 overflow-hidden">
						<div className="relative overflow-hidden h-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary bg-opacity-80 group-hover:bg-opacity-60 text-lg font-semibold duration-300 shadow-black/50 drop-shadow-highlight">
							Launch Muistio
							<img
								src={ButtonTexture}
								alt="Launch Muistio"
								className="absolute inset-0 object-cover animate-button-texture group-hover:animate-button-texture-fast opacity-20 group-hover:opacity-80 duration-300"
							/>
						</div>
					</Link>
				</section>
				{/* Images */}
				<section className="col-span-3 bg-neutral-950"></section>
			</main>
		</div>
	);
};

export default LandingPage;
