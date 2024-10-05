import { useContext } from "react";
import useLogin from "../../../hooks/useLogin";
import AuthContext from "../../../context/AuthContext";
import useLogOut from "../../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import ButtonDropdown from "../../common/ButtonDropdown";
import { FaGoogle } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import Button from "../../common/Button";
import { motion } from "framer-motion";

const profileOptions = [
	{ id: 1, title: "Settings" },
	{ id: 2, title: "Log out", warning: true },
];

const parseStorageSize = (size: number) => {
	if (size < 1000) return `${size} B`;
	return `${Math.floor(size / 1000)} KB`;
};

const StorageIndicator = () => {
	const { storageSize } = useContext(AuthContext);
	const storageUsed = (storageSize / 1_000_000) * 100;

	return (
		<li>
			<div className="w-full flex flex-col justify-center gap-1 px-3 pt-2 pb-1 mb-1 rounded-md text-xs font-normal">
				<p className="flex items-center gap-1">
					<CiCloudOn className="inline-block text-lg stroke-1" /> Storage
					<span className="text-[0.67rem]">
						({storageUsed >= 1 ? Math.floor(storageUsed) : storageUsed.toFixed(2)}%)
					</span>
				</p>
				{/* Percentage bar */}
				<div className="relative bg-primaryHighlight w-full h-1 rounded-full overflow-hidden">
					<motion.div
						initial={{ transform: "translateX(-100%)", backgroundColor: "#0793e3" }}
						animate={{
							transform: `translateX(-${100 - storageUsed}%)`,
							backgroundColor:
								storageUsed >= 90 ? "#fc605d" : storageUsed >= 70 ? "#f59e0b" : "#0793e3",
						}}
						transition={{ type: "spring", stiffness: 80, damping: 20 }}
						className="absolute bg-accent inset-0 rounded-full w-full"
					/>
				</div>
				<p className="text-[0.6rem] font-thin">{`${parseStorageSize(storageSize)} / 1,000 KB`}</p>
			</div>
		</li>
	);
};

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
