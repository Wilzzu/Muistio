import { FC, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { PiWarningDuotone } from "react-icons/pi";

type SettingsCardProps = {
	title: string;
	warning?: boolean;
	children: ReactNode;
};

const SettingsCard: FC<SettingsCardProps> = ({ title, warning, children }) => {
	return (
		<div className="w-full">
			{/* Title */}
			<h1 className="text-xl font-medium mb-2">
				{warning && <PiWarningDuotone className="inline-block text-red-500 mb-1 mr-1" />}
				{title}
			</h1>
			{/* Card */}
			<div
				className={cn(
					"p-[1px] bg-gradient-to-r from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
					{ "from-red-600 via-red-600/70 to-red-600": warning }
				)}>
				{/* Content */}
				<div className="h-full flex flex-col gap-2 p-5 rounded-lg bg-gradient-radial from-background to-secondary duration-200">
					{children}
				</div>
			</div>
		</div>
	);
};

export default SettingsCard;
