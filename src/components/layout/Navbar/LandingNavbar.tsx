import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo_Small.webp";
import Button from "../../common/Button";
import { Dispatch, FC, SetStateAction } from "react";

type LandingNavbarProps = {
	setActiveSection: Dispatch<SetStateAction<number>>;
};

const LandingNavbar: FC<LandingNavbarProps> = ({ setActiveSection }) => {
	return (
		<nav className="max-w-[1200px] font-medium w-full flex justify-between items-center h-24 shrink-0">
			<ul className="flex items-center gap-10">
				<li>
					<button
						onClick={() => setActiveSection(1)}
						className="flex items-center gap-3 mr-3 text-white hover:text-accent duration-200">
						<img src={Logo} alt="Muistio Logo" className="h-10" />
						<p className="font-bold text-3xl">Muistio</p>
					</button>
				</li>
				<li className="mt-1 text-white/85 hover:text-[#21aeff] duration-200">
					<Link to="/faq">Frequently Asked Questions</Link>
				</li>
				<li className="mt-1 text-white/85 hover:text-[#21aeff] duration-200">
					<Link to="/contact">Contact Us</Link>
				</li>
			</ul>

			<Button link="/home" style={{ main: "bg-opacity-80" }} highlight>
				Launch Muistio
			</Button>
		</nav>
	);
};

export default LandingNavbar;
