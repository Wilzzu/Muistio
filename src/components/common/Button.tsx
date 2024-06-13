import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type ButtonProps = {
	link?: string;
	onClick?: () => void;
	highlight?: boolean;
	children: ReactNode;
};

const defaultButtonStyle =
	"flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-sm font-semibold";

const Button: FC<ButtonProps> = ({ link, onClick, highlight, children }) => {
	return (
		// Border for button
		<div
			className={cn(
				"p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
				{ "from-accent via-accent/20 to-accent": highlight }
			)}>
			{/* Link or Normal button */}
			{link ? (
				<Link
					to={link}
					className={cn(defaultButtonStyle, {
						"shadow-accent/30 hover:drop-shadow-highlight": highlight,
					})}>
					{children}
				</Link>
			) : (
				<button onClick={onClick} className={defaultButtonStyle}>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
