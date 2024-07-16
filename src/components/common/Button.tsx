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
	children: ReactNode;
};

const defaultButtonStyles = {
	border:
		"p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
	main: "flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-sm font-semibold",
};

const Button: FC<ButtonProps> = ({
	link,
	onClick,
	highlight,
	warning,
	style,
	override,
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
							style?.border
					  )
			}>
			{/* Link or Normal button */}
			{link ? (
				<Link
					to={link}
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
				</Link>
			) : (
				<button
					onClick={onClick}
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
