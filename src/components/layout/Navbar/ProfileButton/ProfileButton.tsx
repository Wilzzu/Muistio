import { useContext } from "react";
import useLogin from "../../../../hooks/useLogin";
import AuthContext from "../../../../context/AuthContext";
import useLogOut from "../../../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import ButtonDropdown from "../../../common/ButtonDropdown";
import { FaGoogle } from "react-icons/fa";
import defaultAvatar from "../../../../assets/default-avatar.jpg";
import Button from "../../../common/Button";
import StorageIndicator from "./StorageIndicator";

const profileOptions = [
	{ id: 1, title: "Settings" },
	{ id: 2, title: "Log out", warning: true },
];

const ProfileButton = () => {
	const { user, userDataLoading } = useContext(AuthContext);
	const { login } = useLogin();
	const { handleLogOut } = useLogOut();
	const navigate = useNavigate();

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

	if (userDataLoading) {
		return (
			<ButtonDropdown options={profileOptions} onClick={handleLogOut} dropdownSide="right" disabled>
				<div className="h-6 w-6 relative rounded-full overflow-hidden">
					<img
						src={defaultAvatar}
						alt="User avatar"
						className="h-full w-auto object-contain animate-pulse"
					/>
				</div>
				<p className="font-placeholder animate-pulse ml-1 opacity-20">Loading user...</p>
			</ButtonDropdown>
		);
	}

	if (user) {
		return (
			<ButtonDropdown
				options={profileOptions}
				onClick={handleProfileClick}
				customElement={<StorageIndicator />}
				dropdownSide="right">
				<div className="h-4 sm:h-6 w-4 sm:w-6 relative rounded-full overflow-hidden">
					<img
						src={user?.photoURL || defaultAvatar}
						alt="User avatar"
						className="h-full w-auto object-contain"
					/>
				</div>
				<span className="max-w-24 sm:max-w-36 overflow-hidden">
					<p title={user?.displayName || "Unknown User"} className="truncate">
						{user?.displayName || "Unknown User"}
					</p>
				</span>
			</ButtonDropdown>
		);
	}

	return (
		<Button onClick={login} style={{ main: "bg-opacity-80" }}>
			<FaGoogle /> Sign in with Google
		</Button>
	);
};

export default ProfileButton;
