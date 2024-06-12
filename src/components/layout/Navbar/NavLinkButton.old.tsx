import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	link: string;
	children: ReactNode;
};

const NavLinkButton: FC<ButtonProps> = ({ link, children }) => {
	return (
		<div className="p-[1px] bg-gradient-to-b from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[17px]">
			<Link
				to={link}
				className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-radial from-transparent bg-primary to-primary/60 hover:bg-primary/50 duration-200 text-sm font-semibold">
				{children}
			</Link>
		</div>
	);
};

export default NavLinkButton;
