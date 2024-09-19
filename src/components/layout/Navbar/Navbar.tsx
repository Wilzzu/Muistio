import Button from "../../common/Button";
import ProfileButton from "./ProfileButton";
import { LuPlus } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav className="relative flex justify-between items-center px-6 h-16">
			<ul className="flex gap-4">
				<li>
					<Button link="/home">
						<BiHomeAlt2 />
						Home
					</Button>
				</li>
				<li>
					<Button highlight onClick={() => navigate("?modal=new")}>
						<LuPlus />
						New File
					</Button>
				</li>
			</ul>

			<ul className="flex items-center gap-4">
				<li>
					<Link to="/terms-of-service" className="text-sm hover:text-textAccent duration-200">
						Terms of Service
					</Link>
				</li>
				<li className="mr-1">
					<Link to="/privacy-policy" className="text-sm hover:text-textAccent duration-200">
						Privacy Policy
					</Link>
				</li>
				<li>
					<ProfileButton />
				</li>
			</ul>
			{/* Bottom line */}
			<div className="absolute bottom-0 w-full h-[1px] left-0 bg-gradient-radial from-primaryHighlight to-transparent" />
		</nav>
	);
};

export default Navbar;
