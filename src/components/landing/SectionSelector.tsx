import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

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
	setHasInteracted: Dispatch<SetStateAction<boolean>>;
	animate: boolean;
	disabled?: boolean;
};

// Button for each section
const SelectorButton: FC<SelectorButtonProps> = ({
	index,
	active,
	setActiveSection,
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
				<div className="h-full w-full rounded-full bg-secondaryHighlight">
					{active && (
						// Color selected section
						<div
							className={cn("h-full w-full  bg-[#07a4ff] rounded-full", {
								"animate-progress": animate,
							})}
						/>
					)}
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
					setHasInteracted={setHasInteracted}
					animate={!hasInteracted}
					disabled={disabled}
				/>
			))}
		</div>
	);
};

export default SectionSelector;
