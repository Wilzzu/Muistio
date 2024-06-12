import NavButton from "./NavButton";
import { LuPlus } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
	const handleLogOut = () => {
		console.log("logout");
	};

	return (
		<nav className="relative flex justify-between items-center px-6 h-16">
			<ul className="flex gap-4">
				<li>
					<NavButton link="/">
						<BiHomeAlt2 />
						Home
					</NavButton>
				</li>
				<li>
					<NavButton link="/new" highlight>
						<LuPlus />
						New File
					</NavButton>
				</li>
			</ul>
			<NavButton onClick={handleLogOut}>
				<FiLogOut className="text-lg mt-[1px]" />
				Log out
			</NavButton>
			{/* Bottom line */}
			<div className="absolute bottom-0 w-full h-[1px] left-0 bg-gradient-radial from-primaryHighlight to-transparent" />
		</nav>
	);
};

export default Navbar;
