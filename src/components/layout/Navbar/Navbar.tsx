import Button from "../../common/Button";
import { LuPlus } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import useLogOut from "../../../hooks/useLogOut";
import { Link, useNavigate } from "react-router-dom";
import ButtonDropdown from "../../common/ButtonDropdown";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import useLogin from "../../../hooks/useLogin";
import defaultAvatar from "../../../assets/default-avatar.jpg";

const profileOptions = [
	{ id: 1, title: "Settings" },
	{ id: 2, title: "Log out", warning: true },
];

const Navbar = () => {
	const { handleLogOut } = useLogOut();
	const navigate = useNavigate();
	const { user, userDataLoading } = useContext(AuthContext);
	const { login } = useLogin();

	const handleProfileClick = (option: number) => {
		switch (option) {
			case 1:
				navigate("/settings");
				break;
			case 2:
				handleLogOut();
				break;
			default:
				break;
		}
	};

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
					{user ? (
						<ButtonDropdown
							options={profileOptions}
							onClick={handleProfileClick}
							dropdownSide="right">
							<div className="h-6 w-6 relative rounded-full overflow-hidden">
								<img
									src={user?.photoURL || defaultAvatar}
									alt="User avatar"
									className="h-full w-auto object-contain"
								/>
							</div>
							<p>{user?.displayName || "Unknown User"}</p>
						</ButtonDropdown>
					) : userDataLoading ? (
						<ButtonDropdown
							options={profileOptions}
							onClick={handleLogOut}
							dropdownSide="right"
							disabled>
							<div className="h-6 w-6 relative rounded-full overflow-hidden">
								<img
									src={defaultAvatar}
									alt="User avatar"
									className="h-full w-auto object-contain animate-pulse"
								/>
							</div>
							<p className="font-placeholder animate-pulse ml-1 opacity-20">Loading user...</p>
						</ButtonDropdown>
					) : (
						<Button onClick={login} style={{ main: "bg-opacity-80" }}>
							<FaGoogle /> Sign in with Google
						</Button>
					)}
				</li>
			</ul>
			{/* Bottom line */}
			<div className="absolute bottom-0 w-full h-[1px] left-0 bg-gradient-radial from-primaryHighlight to-transparent" />
		</nav>
	);
};

export default Navbar;
