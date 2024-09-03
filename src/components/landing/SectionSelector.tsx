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
	active: boolean;
	setActiveSection: Dispatch<SetStateAction<number>>;
	hasInteracted: boolean;
	setHasInteracted: Dispatch<SetStateAction<boolean>>;
	animate: boolean;
	disabled?: boolean;
};

const selectedAnimation = {
	hidden: {
		transform: "translateX(-100%)",
	},
	visible: (interacted: boolean) => ({
		transform: "translateX(0)",
		transition: { duration: interacted ? 0.5 : 10, ease: "linear" },
	}),
	exit: {
		transform: "translateX(100%)",
		transition: { duration: 0.5 },
	},
};
// Button for each section
const SelectorButton: FC<SelectorButtonProps> = ({
	index,
	active,
	setActiveSection,
	hasInteracted,
	setHasInteracted,
	animate,
	disabled,
}) => {
	const handleClick = () => {
		if (!active) setActiveSection(index);
		if (animate) setHasInteracted(true);
	};
	return (
		<button className="py-4" disabled={disabled} onClick={handleClick}>
			{/* Border container */}
			<div className="w-16 h-2 rounded-full bg-primaryHighlight p-[1px] overflow-hidden">
				{/* Content */}
				<div className="h-full w-full rounded-full bg-secondaryHighlight overflow-hidden">
					<AnimatePresence custom={hasInteracted}>
						{active && (
							// Color selected section
							<motion.div
								key={index}
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={selectedAnimation}
								custom={hasInteracted}
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
		const timeout = setTimeout(() => setDisabled(false), 600);

		return () => clearTimeout(timeout);
	}, [activeSection]);
	return (
		<div className="flex gap-4 py-4 items-center justify-start mt-10">
			{[1, 2, 3].map((index) => (
				<SelectorButton
					key={index}
					index={index}
					active={activeSection === index}
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
