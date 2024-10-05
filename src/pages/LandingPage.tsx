/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";
import LandingNavbar from "../components/layout/Navbar/LandingNavbar";
import CTAButton from "../components/landing/CTAButton";
import SectionOne from "../components/landing/SectionOne";
import SectionTwo from "../components/landing/SectionTwo";
import SectionThree from "../components/landing/SectionThree";
import SectionSelector from "../components/landing/SectionSelector";
import useDetectScroll from "../hooks/useDetectScroll";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/layout/Footer/Footer";

const LandingPage = () => {
	const [activeSection, setActiveSection] = useState(1);
	const [hasInteracted, setHasInteracted] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	useDetectScroll(onPageScroll, "muistioLandingEditor");

	// Memoize sections so we dont rerender them
	const { S1Text, S1Image } = useMemo(() => SectionOne(setHasInteracted), []);
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

	// Change section on scroll
	function onPageScroll(event: WheelEvent) {
		// Ignore scroll if the container has a scrollbar
		if (
			scrollContainerRef.current &&
			scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight
		)
			return;

		if (event.deltaY > 0) setActiveSection((prev) => (prev === 3 ? 1 : prev + 1));
		else setActiveSection((prev) => (prev === 1 ? 3 : prev - 1));
		setHasInteracted(true);
	}

	// Change section automatically after time
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!hasInteracted) setActiveSection((prev) => (prev === 3 ? 1 : prev + 1));
		}, 10150);

		return () => clearTimeout(timeout);
	}, [activeSection, hasInteracted]);

	return (
		<div className="sm:h-dvh sm:px-2 sm:py-1 sm:overflow-hidden">
			{/* Scroll container */}
			<div
				ref={scrollContainerRef}
				className="h-full flex flex-col items-center overflow-y-scroll px-2 sm:px-0 sm:scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight scrollbar-thumb-rounded-full">
				<LandingNavbar logoClickFunction={() => setActiveSection(1)} />

				{/* Desktop */}
				<main className="hidden sm:grid max-w-[1200px] w-full grid-cols-5 h-full min-h-[700px] pb-20">
					<section className="flex flex-col justify-center gap-8 px-4 pt-4 col-span-2">
						{/* Text */}
						<AnimatePresence mode="wait">
							{ActiveText && <ActiveText key={`LandingTextContent-${activeSection}`} />}
						</AnimatePresence>

						<CTAButton />

						{/* Section Selector */}
						<SectionSelector
							activeSection={activeSection}
							setActiveSection={setActiveSection}
							hasInteracted={hasInteracted}
							setHasInteracted={setHasInteracted}
						/>
					</section>
					{/* Images */}
					<AnimatePresence mode="wait">
						<section
							key={`LandingImageSection-${activeSection}`}
							className="relative min-h-[700px] col-span-3 flex flex-col items-center justify-center select-none overflow-hidden shadow-accent/20 drop-shadow-centered-2xl">
							{ActiveImage && <ActiveImage />}
						</section>
					</AnimatePresence>
				</main>

				{/* Mobile */}
				<main className="sm:hidden flex flex-col gap-10 px-3">
					<section>
						<div className="flex flex-col items-center justify-center gap-4 py-12">
							<S1Text />
							<CTAButton />
						</div>
						<div className="relative w-full h-[calc(100dvh/1.9)] my-8 shadow-accent/10 drop-shadow-centered-xl">
							<S1Image />
						</div>
					</section>
					<section>
						<div className="flex flex-col items-center justify-center gap-4 pb-12">
							<S2Text />
							<CTAButton />
						</div>
						<div className="relative w-full h-[calc(100dvh/2.2)] my-8 shadow-accent/10 drop-shadow-centered-xl">
							<S2Image />
						</div>
					</section>
					<section>
						<div className="flex flex-col items-center justify-center gap-4 pb-9">
							<S3Text />
							<CTAButton />
						</div>
						<div className="relative flex items-center justify-center w-full h-[calc(100dvh/1.8)] my-8 shadow-accent/10 drop-shadow-centered-xl overflow-hidden">
							<S3Image />
						</div>
					</section>
				</main>

				<Footer marginTop={32} />
			</div>
		</div>
	);
};

export default LandingPage;
