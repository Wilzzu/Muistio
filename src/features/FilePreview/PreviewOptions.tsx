import Button from "../../components/common/Button";
import { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FiCheck, FiDownload, FiSearch, FiX } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../../components/common/Modal";
import GenerateDownloadLink from "../../components/common/GenerateDownloadLink";

// Temporary file details
const file = {
	title: "Test File Name",
	content: "Test content",
};

type PreviewOptionsProps = {
	isEditing: boolean;
	startEditing: () => void;
	isPreviewingEdit: boolean;
	toggleEditPreview: () => void;
	hasUnsavedChanges: () => boolean;
	discardAndExit: () => void;
};

const PreviewOptions: FC<PreviewOptionsProps> = ({
	isEditing,
	startEditing,
	isPreviewingEdit,
	toggleEditPreview,
	hasUnsavedChanges,
	discardAndExit,
}) => {
	const [showWarning, setShowWarning] = useState(false);

	const handleExitButtonClick = () => {
		if (hasUnsavedChanges()) setShowWarning(true);
		else discardAndExit();
	};

	const handleWarningExitClick = () => {
		setShowWarning(false);
		discardAndExit();
	};

	return (
		<>
			<div className="absolute -right-4 -top-4 p-8 flex gap-2 opacity-70 hover:opacity-100 duration-150">
				{isEditing ? (
					<>
						<Button style={{ main: "p-2 text-base" }} onClick={toggleEditPreview}>
							{isPreviewingEdit ? <MdEdit /> : <FiSearch />}
						</Button>
						<Button highlight style={{ main: "p-2 text-base" }}>
							<FiCheck />
						</Button>
						<Button warning style={{ main: "p-2 text-base" }} onClick={handleExitButtonClick}>
							<FiX />
						</Button>
					</>
				) : (
					<>
						<Button style={{ main: "p-2 text-base" }} onClick={startEditing}>
							<MdEdit />
						</Button>
						<GenerateDownloadLink title={file.title} content={file.content}>
							<Button style={{ main: "p-2 text-base" }}>
								<FiDownload className="text-white" />
							</Button>
						</GenerateDownloadLink>
						<Button warning style={{ main: "p-2 text-base" }}>
							<LuTrash2 />
						</Button>
					</>
				)}
			</div>

			{/* Unsaved changes warning modal*/}
			{showWarning && (
				<Modal closeModalFunction={() => setShowWarning(false)}>
					<h1 className="font-bold">You have unsaved changes!</h1>
					<p>
						Are you sure you want to <b>discard all changes</b> and exit the editor?
					</p>
					<div className="w-full mt-2 flex justify-end font-semibold gap-2">
						<Button
							onClick={() => setShowWarning(false)}
							style={{
								main: "bg-[#2C3240] hover:bg-transparent",
							}}>
							Cancel
						</Button>
						<Button
							onClick={handleWarningExitClick}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Discard changes and exit
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default PreviewOptions;
