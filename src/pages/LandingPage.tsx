/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";
import CTAButton from "../components/landing/CTAButton";
import SectionOne from "../components/landing/SectionOne";
import SectionTwo from "../components/landing/SectionTwo";
import SectionThree from "../components/landing/SectionThree";

const LandingPage = () => {
	const [activeSection, setActiveSection] = useState(3);

	// Memoize section so we dont rerender them
	const { S1Text, S1Image } = useMemo(() => SectionOne(), []);
	const { S2Text, S2Image } = useMemo(() => SectionTwo(), []);
	const { S3Text, S3Image } = useMemo(() => SectionThree(), []);

	const sections = useMemo(
		() => [
			{ Text: S1Text, Image: S1Image },
			{ Text: S2Text, Image: S2Image },
			{ Text: S3Text, Image: S3Image },
		],
		[]
	);

	// Show the active section
	const { Text: ActiveText, Image: ActiveImage } = sections[activeSection - 1];

	return (
		<div className="h-dvh px-2 py-1 overflow-hidden">
			{/* Scrollable container */}
			<div className="h-dvh flex flex-col items-center overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
				<LandingNavbar />
				<main className="max-w-[1200px] grid grid-cols-5 h-full min-h-[700px] pb-20">
					<section className="flex flex-col justify-center gap-8 px-4 col-span-2">
						{ActiveText && <ActiveText />}
						<CTAButton />
						{/* DEV next button */}
						<button onClick={() => setActiveSection((prev) => (prev === 3 ? 1 : prev + 1))}>
							next
						</button>
					</section>
					{/* Images */}
					<section className="relative min-h-[700px] col-span-3 flex flex-col items-center justify-center select-none">
						{ActiveImage && <ActiveImage />}
					</section>
				</main>
			</div>
		</div>
	);
};

export default LandingPage;
