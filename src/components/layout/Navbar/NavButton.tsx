import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

type LinkButtonProps = {
	link: string;
	onClick?: never;
	highlight?: boolean;
	children: ReactNode;
};

type ClickButtonProps = {
	link?: never;
	onClick: () => void;
	highlight?: boolean;
	children: ReactNode;
};

type ButtonProps = LinkButtonProps | ClickButtonProps;

const buttonStyle =
	"flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-sm font-semibold";

const NavButton: FC<ButtonProps> = ({ link, onClick, highlight, children }) => {
	return (
		// Border for button
		<div
			className={cn(
				"p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
				highlight && "from-accent via-accent/20 to-accent" //hover:via-accent/30 hover:to-accent shadow-accent/30 hover:drop-shadow-highlight
			)}>
			{/* Link or Normal button */}
			{link ? (
				<Link
					to={link}
					className={cn(
						"flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-sm font-semibold",
						highlight && "shadow-accent/30 hover:drop-shadow-highlight"
					)}>
					{children}
				</Link>
			) : (
				<button onClick={onClick} className={buttonStyle}>
					{children}
				</button>
			)}
		</div>
	);
};

export default NavButton;
