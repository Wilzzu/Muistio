import Button from "../../components/common/Button";
import { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FiCheck, FiDownload, FiSearch, FiX } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../../components/common/Modal";
import GenerateDownloadLink from "../../components/common/GenerateDownloadLink";
import { File } from "../../types/types";
import useDeleteFile from "../../hooks/useDeleteFile";
import { cn } from "../../lib/utils";

type PreviewOptionsProps = {
	selectedFile: File | null;
	isEditing: boolean;
	startEditing: () => void;
	saveEdits: () => void;
	isPreviewingEdit: boolean;
	toggleEditPreview: () => void;
	hasUnsavedChanges: () => boolean;
	discardAndExit: () => void;
	showOnlyEditButton?: boolean;
	disabled?: boolean;
	content?: string | undefined;
};

const PreviewOptions: FC<PreviewOptionsProps> = ({
	selectedFile,
	isEditing,
	startEditing,
	saveEdits,
	isPreviewingEdit,
	toggleEditPreview,
	hasUnsavedChanges,
	discardAndExit,
	showOnlyEditButton,
	disabled,
	content,
}) => {
	const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);
	const { deleteFileMutation, isDeleting } = useDeleteFile(selectedFile?.id);

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
			<div
				className={cn(
					"absolute right-4 top-4 flex gap-2 opacity-50 hover:opacity-100 duration-150",
					{ "pointer-events-none": disabled }
				)}>
				{isEditing ? (
					<>
						<Button
							style={{ main: "p-2 text-base" }}
							onClick={toggleEditPreview}
							disabled={disabled}>
							{isPreviewingEdit ? <MdEdit /> : <FiSearch />}
						</Button>
						{!showOnlyEditButton && (
							<>
								<Button
									highlight
									style={{ main: "p-2 text-base" }}
									onClick={saveEdits}
									disabled={disabled}>
									<FiCheck />
								</Button>
								<Button
									warning
									style={{ main: "p-2 text-base" }}
									onClick={handleExitButtonClick}
									disabled={disabled}>
									<FiX />
								</Button>
							</>
						)}
					</>
				) : (
					<>
						<Button
							style={{ main: "p-2 text-base" }}
							onClick={startEditing}
							disabled={disabled || isDeleting}>
							<MdEdit />
						</Button>
						{!showOnlyEditButton && selectedFile && (
							<>
								<GenerateDownloadLink
									title={selectedFile.title}
									content={content}
									disabled={disabled || isDeleting || !content}>
									<Button style={{ main: "p-2 text-base" }} disabled={disabled || isDeleting}>
										<FiDownload className="text-white" />
									</Button>
								</GenerateDownloadLink>
								<Button
									warning
									style={{ main: "p-2 text-base" }}
									disabled={disabled || isDeleting}
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
