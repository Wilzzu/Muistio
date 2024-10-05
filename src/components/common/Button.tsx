/* eslint-disable no-mixed-spaces-and-tabs */
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type CustomButtonStyles = {
	border?: string;
	main?: string;
};

type ButtonProps = {
	link?: string;
	onClick?: () => void;
	highlight?: boolean;
	warning?: boolean;
	style?: CustomButtonStyles;
	override?: boolean;
	disabled?: boolean;
	children: ReactNode;
};

const defaultButtonStyles = {
	border:
		"w-fit p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[7px] sm:rounded-[9px] duration-200",
	main: "h-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md sm:rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-xs sm:text-sm font-semibold disabled:opacity-50 disabled:pointer-events-none text-nowrap",
};

const Button: FC<ButtonProps> = ({
	link,
	onClick,
	highlight,
	warning,
	style,
	override,
	disabled,
	children,
}) => {
	return (
		// Border for button
		<div
			className={
				override
					? style?.border
					: cn(
							defaultButtonStyles.border,
							{
								"from-accent via-accent/20 to-accent": highlight,
							},
							{
								"from-red-600 via-red-600/20 to-red-600": warning,
							},
							{
								"opacity-50 disabled:pointer-events-none": disabled,
							},
							style?.border
					  )
			}>
			{/* Link or Normal button */}
			{link ? (
				<Link
					to={disabled ? "#" : link}
					className={
						override
							? style?.main
							: cn(
									defaultButtonStyles.main,
									{
										"shadow-accent/30 hover:drop-shadow-highlight": highlight,
									},
									{
										"shadow-red-800/60 hover:drop-shadow-highlight": warning,
									},
									{
										"opacity-50 pointer-events-none": disabled,
									},
									style?.main
							  )
					}>
					{children}
				</Link>
			) : (
				<button
					onClick={onClick}
					disabled={disabled}
					className={
						override
							? style?.main
							: cn(
									defaultButtonStyles.main,
									{
										"shadow-accent/30 hover:drop-shadow-highlight": highlight,
									},
									{
										"shadow-red-800/60 hover:drop-shadow-highlight": warning,
									},
									style?.main
							  )
					}>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
