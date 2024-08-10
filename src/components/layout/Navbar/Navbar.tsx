import Button from "../../common/Button";
import { LuPlus } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import useLogOut from "../../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { handleLogOut } = useLogOut();
	const navigate = useNavigate();

	return (
		<>
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
				<Button onClick={handleLogOut}>
					<FiLogOut className="text-lg mt-[1px]" />
					Log out
				</Button>
				{/* Bottom line */}
				<div className="absolute bottom-0 w-full h-[1px] left-0 bg-gradient-radial from-primaryHighlight to-transparent" />
			</nav>
		</>
	);
};

export default Navbar;
