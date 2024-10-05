import { motion } from "framer-motion";
import { FC } from "react";
import { cn } from "../../lib/utils";

type LandingTitleContent = {
	text: string;
	highlight?: number[];
	underline?: string;
};

const textAnimation = {
	hidden: {
		y: 16,
		opacity: 0,
		rotate: 0.0001,
	},
	visible: {
		y: 0,
		opacity: 1,
		rotate: 0.0001,
		transition: {
			duration: 1,
			ease: [0.18, 0.1, 0.25, 1],
		},
	},
	exit: {
		y: -16,
		opacity: 0,
		rotate: 0.0001,
		transition: {
			duration: 0.3,
			ease: [0.18, 0.1, 0.25, 1],
		},
	},
};

const underlineAnimation = {
	hidden: {
		width: 0,
		opacity: 0,
	},
	visible: {
		opacity: 1,
		width: "100%",
		transition: {
			duration: 1.7,
			ease: [0.93, 0, 0.33, 1],
			opacity: { duration: 1, ease: [0.93, 0, 0.33, 1] },
		},
	},
	exit: {
		width: 0,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

// Highlight the character if it is within the set range
const highlightCharacter = (
	line: string,
	charIndex: number,
	wordIndex: number,
	range?: number[]
) => {
	if (!range) return false;
	// Calculate the index of the current character in the entire line
	const startIndex = line.split(" ").slice(0, wordIndex).join(" ").length + charIndex;
	const endIndex = startIndex + 1;

	// Check if the character index is within the highlight range
	return startIndex >= range[0] && endIndex <= range[1];
};

const LandingTitleAnimation: FC<{ content: LandingTitleContent[] }> = ({ content }) => {
	return (
		<>
			<span className="sr-only">{content.map((e) => e.text).join(" ")}</span>
			{/* Container for staggering */}
			<motion.span
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				exit="exit"
				variants={{
					visible: { transition: { staggerChildren: 0.05 } },
					hidden: {},
					exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
				}}
				aria-hidden>
				{/* Line */}
				{content.map((line, lineIndex) => (
					<span className="block" key={`${line}-${lineIndex}`}>
						{/* Word */}
						{line.text.split(" ").map((word, wordIndex) => (
							<span className="relative inline-block" key={`${word}-${wordIndex}`}>
								{/* Character */}
								{word.split("").map((char, charIndex) => (
									<motion.span
										key={`${char}-${charIndex}`}
										className={cn("inline-block", {
											"text-accent selection:text-black": highlightCharacter(
												line.text,
												charIndex,
												wordIndex,
												line?.highlight
											),
										})}
										variants={textAnimation}>
										{char}
									</motion.span>
								))}
								{/* Space after word */}
								<span
									className={cn("inline-block", {
										// Hide space if we are on the last word of the line
										hidden:
											content.length === lineIndex + 1 &&
											wordIndex === line.text.split(" ").length - 1,
									})}>
									&nbsp;
								</span>
								{/* Underline */}
								<motion.span
									variants={underlineAnimation}
									className={cn(
										"absolute bottom-0 left-0 w-full h-[6px] bg-accent rounded-full hidden",
										{ block: word === line?.underline }
									)}
								/>
							</span>
						))}
					</span>
				))}
			</motion.span>
		</>
	);
};

export default LandingTitleAnimation;
