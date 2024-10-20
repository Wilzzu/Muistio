import { Link } from "react-router-dom";
import SettingsCard from "../components/common/SettingsCard";
import Button from "../components/common/Button";
import { useState } from "react";
import Modal from "../components/common/Modal";
import useDeleteAccount from "../hooks/useDeleteAccountAndFiles";
import { IoIosArrowBack } from "react-icons/io";

const Settings = () => {
	const [showAccountDeleteWarning, setShowAccountDeleteWarning] = useState(false);
	const { deleteFileMutation, isDeleting } = useDeleteAccount();

	return (
		<div className="flex justify-center">
			<main className="flex flex-col gap-6 sm:gap-10 w-full max-w-[800px] pt-3 px-3 sm:px-0">
				{/* Header */}
				<div>
					<Link
						to={"/home"}
						className="w-fit text-sm opacity-70 hover:opacity-100 hover:underline duration-100">
						<IoIosArrowBack className="inline-block mb-[2px] -ml-1" />
						Back
					</Link>
					<div className="mt-2">
						<h1 className="text-xl sm:text-2xl font-medium">Settings</h1>
						<div className="mt-1 h-[2px] bg-primary" />
					</div>
				</div>

				{/* Settings cards */}
				<SettingsCard title="Delete Account and All Files" warning>
					<p className="mb-2">
						All your files and account data will be permanently deleted.{" "}
						<br className="hidden sm:inline-block" />
						You might be propmted to reauthenticate during the process. <br />{" "}
						<br className="inline-block sm:hidden" />
						This action is irreversible.
					</p>
					<Button
						warning
						onClick={() => setShowAccountDeleteWarning(true)}
						style={{ main: "bg-opacity-80" }}>
						Delete Account and All Files
					</Button>
				</SettingsCard>
			</main>

			{/* Delete account modal */}
			{showAccountDeleteWarning && (
				<Modal closeModalFunction={() => (isDeleting ? false : setShowAccountDeleteWarning(false))}>
					<h1 className="font-bold">Delete Account and All Files?</h1>
					<p>Are you sure, all your files and account data will be permanently deleted?</p>
					<div className="w-full mt-2 flex justify-end font-semibold gap-2">
						<Button
							disabled={isDeleting}
							onClick={() => setShowAccountDeleteWarning(false)}
							style={{
								main: "bg-[#2C3240] hover:bg-transparent",
							}}>
							Cancel
						</Button>
						<Button
							disabled={isDeleting}
							onClick={deleteFileMutation}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Delete Account and All Files
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Settings;
