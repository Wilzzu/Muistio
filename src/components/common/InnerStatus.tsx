import { FC } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

type InnerStatusProps = {
	content: string;
	warning?: boolean | null;
	fadeOnHover?: boolean;
	height?: "sm" | "md" | "lg";
};

const InnerStatus: FC<InnerStatusProps> = ({ content, warning, fadeOnHover, height = "sm" }) => {
	return (
		<motion.div
			initial={{ y: -50 }}
			animate={{ y: 0 }}
			exit={{ y: -50 }}
			transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
			className={cn(
				"bg-gradient-to-b from-accent to-[#5AB7FF] p-[2px] rounded-b-[10px] duration-150 transition-opacity",
				{
					"from-red-400 via-red-500 to-red-400 pointer-events-auto": warning,
				},
				{
					"hover:opacity-30 hover:blur-[2px] pointer-events-auto": fadeOnHover,
				}
			)}>
			{/* Content */}
			<div
				className={cn(
					"px-6 bg-gradient-radial from-[#077bff] from-40% to-accent text-sm font-semibold drop-shadow-md rounded-b-lg",
					{
						"from-red-700/50 to-red-500/50": warning,
					},
					{
						"py-[0.1rem]": height === "sm",
						"py-1": height === "md",
						"py-2": height === "lg",
					}
				)}>
				<p className="shadow-black/40 drop-shadow-text-sm">{content}</p>
			</div>
		</motion.div>
	);
};

export default InnerStatus;
