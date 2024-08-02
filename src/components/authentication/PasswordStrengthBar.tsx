import { FC } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

type PasswordStrengthBarProps = {
	strength: number;
};

const parseStrength = ["Weak", "Medium", "Strong", "Very strong"];
const strengthColor = ["bg-red-500", "bg-orange-400", "bg-accent", "bg-green-500"];

const PasswordStrengthBar: FC<PasswordStrengthBarProps> = ({ strength }) => {
	return (
		<div className="mt-1 px-1">
			<div className="relative flex gap-2 rounded-full overflow-hidden">
				{/* Segments */}
				{[...Array(4).keys()].map((_, i) => (
					<div
						key={i}
						className={cn("bg-white/20 h-[2px] w-full rounded-full", { "bg-white/90": strength })}
					/>
				))}
				{/* Bar */}
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `calc(${strength * 25}% - ${(4 - strength) * 2}px)` }}
					transition={{ duration: 0.4 }}
					className={cn("absolute inset-0 rounded-full", strengthColor[strength - 1])}
				/>
			</div>
			{/* Text */}
			<p className="text-sm font-medium text-right min-h-5">{parseStrength[strength - 1]}</p>
		</div>
	);
};

export default PasswordStrengthBar;
