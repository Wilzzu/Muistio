import Button from "../../components/common/Button";
import { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FiCheck, FiDownload, FiSearch, FiX } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../../components/common/Modal";
import GenerateDownloadLink from "../../components/common/GenerateDownloadLink";
import { File } from "../../types/types";
import useDeleteFile from "../../hooks/useDeleteFile";

type PreviewOptionsProps = {
	selectedFile: File | null;
	isEditing: boolean;
	startEditing: () => void;
	isPreviewingEdit: boolean;
	toggleEditPreview: () => void;
	hasUnsavedChanges: () => boolean;
	discardAndExit: () => void;
	showOnlyEditButton?: boolean;
};

const PreviewOptions: FC<PreviewOptionsProps> = ({
	selectedFile,
	isEditing,
	startEditing,
	isPreviewingEdit,
	toggleEditPreview,
	hasUnsavedChanges,
	discardAndExit,
	showOnlyEditButton,
}) => {
	const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);
	const { deleteFileMutation, isDeleting } = useDeleteFile(selectedFile!.id);

	const handleExitButtonClick = () => {
		if (hasUnsavedChanges()) setShowUnsavedWarning(true);
		else discardAndExit();
	};

	const handleUnsavedWarningExitClick = () => {
		setShowUnsavedWarning(false);
		discardAndExit();
	};

	const handleDeleteFile = () => {
		deleteFileMutation();
		setShowDeleteWarning(false);
	};

	return (
		<>
			<div className="absolute -right-4 -top-4 p-8 flex gap-2 opacity-70 hover:opacity-100 duration-150">
				{isEditing ? (
					<>
						<Button style={{ main: "p-2 text-base" }} onClick={toggleEditPreview}>
							{isPreviewingEdit ? <MdEdit /> : <FiSearch />}
						</Button>
						{!showOnlyEditButton && (
							<>
								<Button highlight style={{ main: "p-2 text-base" }}>
									<FiCheck />
								</Button>
								<Button warning style={{ main: "p-2 text-base" }} onClick={handleExitButtonClick}>
									<FiX />
								</Button>
							</>
						)}
					</>
				) : (
					<>
						<Button style={{ main: "p-2 text-base" }} onClick={startEditing} disabled={isDeleting}>
							<MdEdit />
						</Button>
						{!showOnlyEditButton && selectedFile && (
							<>
								<GenerateDownloadLink
									title={selectedFile.title}
									content={selectedFile.content}
									disabled={isDeleting}>
									<Button style={{ main: "p-2 text-base" }} disabled={isDeleting}>
										<FiDownload className="text-white" />
									</Button>
								</GenerateDownloadLink>
								<Button
									warning
									style={{ main: "p-2 text-base" }}
									disabled={isDeleting}
									onClick={() => setShowDeleteWarning(true)}>
									<LuTrash2 />
								</Button>
							</>
						)}
					</>
				)}
			</div>

			{/* Unsaved changes warning modal*/}
			{showUnsavedWarning && (
				<Modal closeModalFunction={() => setShowUnsavedWarning(false)}>
					<h1 className="font-bold">You have unsaved changes!</h1>
					<p>
						Are you sure you want to <b>discard all changes</b> and exit the editor?
					</p>
					<div className="w-full mt-2 flex justify-end font-semibold gap-2">
						<Button
							onClick={() => setShowUnsavedWarning(false)}
							style={{
								main: "bg-[#2C3240] hover:bg-transparent",
							}}>
							Cancel
						</Button>
						<Button
							onClick={handleUnsavedWarningExitClick}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Discard changes and exit
						</Button>
					</div>
				</Modal>
			)}

			{/* Delete modal */}
			{showDeleteWarning && (
				<Modal closeModalFunction={() => setShowDeleteWarning(false)}>
					<h1 className="font-bold">Delete file?</h1>
					<p>
						Are you sure you want to delete <b>{selectedFile?.title}</b> file?
					</p>
					<div className="w-full mt-2 flex justify-end font-semibold gap-2">
						<Button
							onClick={() => setShowDeleteWarning(false)}
							style={{
								main: "bg-[#2C3240] hover:bg-transparent",
							}}>
							Cancel
						</Button>
						<Button
							onClick={handleDeleteFile}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Delete
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default PreviewOptions;
