/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionSelectorProps = {
	activeSection: number;
	setActiveSection: Dispatch<SetStateAction<number>>;
	hasInteracted: boolean;
	setHasInteracted: Dispatch<SetStateAction<boolean>>;
};

type SelectorButtonProps = {
	index: number;
	activeSection: number;
	setActiveSection: Dispatch<SetStateAction<number>>;
	hasInteracted: boolean;
	setHasInteracted: Dispatch<SetStateAction<boolean>>;
	animate: boolean;
	disabled?: boolean;
};

type SelectedAnimationProps = {
	reverse?: boolean;
	interacted?: boolean;
};

const selectedAnimation = {
	hidden: ({ reverse }: SelectedAnimationProps) => ({
		transform: `translateX(${reverse ? "100%" : "-100%"})`,
	}),
	visible: ({ interacted }: SelectedAnimationProps) => ({
		transform: "translateX(0)",
		transition: { duration: interacted ? 0.5 : 10, ease: "linear" },
	}),
	exit: ({ reverse, interacted }: SelectedAnimationProps) => ({
		transform: `translateX(${reverse ? "-100%" : "100%"})`,
		transition: { duration: interacted ? 0.5 : 1 },
	}),
};
// Button for each section
const SelectorButton: FC<SelectorButtonProps> = ({
	index,
	activeSection,
	setActiveSection,
	hasInteracted,
	setHasInteracted,
	animate,
	disabled,
}) => {
	const [section, setSection] = useState(activeSection);
	const [reverse, setReverse] = useState(false);
	const [ready, setReady] = useState(false);
	const handleClick = () => {
		if (activeSection !== index) setActiveSection(index);
		if (animate) setHasInteracted(true);
	};

	const calculateReverse = () => {
		if (activeSection === 1 && section === 3) return false;
		if (activeSection === 3 && section === 1) return true;
		return activeSection < section;
	};

	// Calculate if the animation should be reversed, and set ready to true to trigger the section change
	useEffect(() => {
		setReverse(calculateReverse);
		setReady(true);
	}, [activeSection]);

	// We need to wait for the reverse calculation to be done before changing the section, otherwise the exit animation will be wrong
	useEffect(() => {
		if (!ready) return;
		setSection(activeSection);
		setReady(false);
	}, [ready]);

	return (
		<button className="py-4" disabled={disabled} onClick={handleClick}>
			{/* Border container */}
			<div className="w-16 h-2 rounded-full bg-primaryHighlight p-[1px] overflow-hidden">
				{/* Content */}
				<div className="h-full w-full rounded-full bg-secondaryHighlight overflow-hidden">
					<AnimatePresence>
						{section === index && (
							// Color selected section
							<motion.div
								key={index}
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={selectedAnimation}
								custom={{ interacted: hasInteracted, reverse: reverse }}
								className="h-full w-full bg-[#07a4ff] rounded-full"
							/>
						)}
					</AnimatePresence>
				</div>
			</div>
		</button>
	);
};

const SectionSelector: FC<SectionSelectorProps> = ({
	activeSection,
	setActiveSection,
	hasInteracted,
	setHasInteracted,
}) => {
	const [disabled, setDisabled] = useState(false);
	useEffect(() => {
		setDisabled(true);
		const timeout = setTimeout(() => setDisabled(false), 700);

		return () => clearTimeout(timeout);
	}, [activeSection]);
	return (
		<div className="hidden sm:flex gap-4 py-4 items-center justify-start mt-10">
			{[1, 2, 3].map((index) => (
				<SelectorButton
					key={index}
					index={index}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					hasInteracted={hasInteracted}
					setHasInteracted={setHasInteracted}
					animate={!hasInteracted}
					disabled={disabled}
				/>
			))}
		</div>
	);
};

export default SectionSelector;
