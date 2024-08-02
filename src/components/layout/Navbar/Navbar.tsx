import Button from "../../common/Button";
import { LuPlus } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import CreateNewFile from "../../../features/CreateNewFile/CreateNewFile";
import useLogOut from "../../../hooks/useLogOut";

const Navbar = () => {
	const [showCreateNewFileModal, setShowCreateNewFileModal] = useState(false);
	const { handleLogOut } = useLogOut();

	return (
		<>
			<nav className="relative flex justify-between items-center px-6 h-16">
				<ul className="flex gap-4">
					<li>
						<Button link="/">
							<BiHomeAlt2 />
							Home
						</Button>
					</li>
					<li>
						<Button highlight onClick={() => setShowCreateNewFileModal(true)}>
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
			{showCreateNewFileModal && (
				<CreateNewFile closeModal={() => setShowCreateNewFileModal(false)} />
			)}
		</>
	);
};

export default Navbar;
