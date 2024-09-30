import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo_Small.webp";
import Button from "../../common/Button";
import { FC } from "react";
import { cn } from "../../../lib/utils";

type LandingNavbarProps = {
	logoClickFunction: () => void;
};

type LinkItemProps = {
	to: string;
	text: string;
	location: string;
};

const LinkItem: FC<LinkItemProps> = ({ to, text, location }) => {
	return (
		<li
			className={cn("mt-1 text-white/85 hidden sm:block hover:text-textAccent duration-200", {
				"text-textAccent": location === to,
			})}>
			<Link to={to}>{text}</Link>
		</li>
	);
};

const LandingNavbar: FC<LandingNavbarProps> = ({ logoClickFunction }) => {
	const location = useLocation();
	return (
		<nav className="max-w-[1200px] font-medium w-full flex justify-between items-center h-16 sm:h-24 shrink-0 px-3 sm:px-0">
			<ul className="flex items-center gap-10">
				<li>
					<button
						onClick={logoClickFunction}
						className="flex items-center gap-2 sm:gap-3 mr-3 text-white hover:text-accent duration-200">
						<img src={Logo} alt="Muistio Logo" className="h-8 sm:h-10 w-auto" />
						<p className="font-bold text-xl sm:text-3xl">Muistio</p>
					</button>
				</li>
				{/* <LinkItem to="faq" text="FaQ" location={location.pathname} /> */}
				<LinkItem to="/terms-of-service" text="Terms Of Service" location={location.pathname} />
				<LinkItem to="/privacy-policy" text="Privacy Policy" location={location.pathname} />
			</ul>

			<Button link="/home" style={{ main: "bg-opacity-80" }} highlight>
				Launch Muistio
			</Button>
		</nav>
	);
};

export default LandingNavbar;
