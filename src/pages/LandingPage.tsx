import { useState } from "react";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";
import SectionThree from "../components/landing/SectionThree";
import CTAButton from "../components/landing/CTAButton";

const LandingPage = () => {
	const [activeSection, setActiveSection] = useState(3);
	const { S3Text, S3Image } = SectionThree();

	return (
		<div className="h-dvh px-2 py-1 overflow-hidden">
			{/* Scrollable container */}
			<div className="h-dvh flex flex-col items-center overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
				<LandingNavbar />
				<main className="max-w-[1200px] grid grid-cols-5 h-full min-h-[700px] pb-20">
					<section className="flex flex-col justify-center gap-8 px-4 col-span-2">
						{/* Change the content depending on active section */}
						{activeSection === 3 ? <S3Text /> : null}
						<CTAButton />
					</section>
					{/* Images */}
					<section className="relative min-h-[700px] col-span-3 flex flex-col items-center justify-center select-none">
						{activeSection === 3 ? <S3Image /> : null}
					</section>
				</main>
			</div>
		</div>
	);
};

export default LandingPage;
