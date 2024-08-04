import { FC, useContext, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";
import { addFile } from "../../firebase/firebase";
import Button from "../../components/common/Button";
import FilePreview from "../FilePreview/FilePreview";
import Modal from "../../components/common/Modal";
import { useNavigate } from "react-router-dom";
import FilesContext from "../../context/FilesContext";
import { Timestamp } from "firebase/firestore";
import TextInput from "../../components/common/TextInput";
import InnerStatus from "../../components/common/InnerStatus";
import { motion, AnimatePresence } from "framer-motion";
import NotificationContext from "../../context/NotificationContext";

type CreateNewFileProps = {
	closeModal: () => void;
};

type InvalidFieldType = {
	title: boolean;
	content: boolean;
};

const defaultInvalidFields = {
	title: false,
	content: false,
};

const CreateNewFile: FC<CreateNewFileProps> = ({ closeModal }) => {
	const { user } = useContext(AuthContext);
	const { setSelectedFile } = useContext(FilesContext);
	const { showNotification } = useContext(NotificationContext);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showWarning, setShowWarning] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
	const [invalidFields, setInvalidFields] = useState<InvalidFieldType>(defaultInvalidFields);

	const onSuccess = (newFileId: string) => {
		queryClient.invalidateQueries({ queryKey: ["files", user?.uid] });
		setSelectedFile({ id: newFileId, content, dateModified: Timestamp.now(), size: 1, title });
		navigate(`/file/${newFileId}`);
		showNotification({ content: "File created successfully!" });
		closeModal();
	};

	const onError = () => {
		setIsDisabled(false);
		if (errorTimeout) clearTimeout(errorTimeout);
		const timeout = setTimeout(() => {
			addFileMutation.reset();
		}, 6000);
		setErrorTimeout(timeout);
	};

	// Use React Query to keep track of mutation state
	const addFileMutation = useMutation({
		mutationFn: ({ userId, title, content }: { userId: string; title: string; content: string }) =>
			addFile(userId, title, content),
		onSuccess: (newFileId: string) => onSuccess(newFileId),
		onError: onError,
	});

	const validateFieldsAndUpload = () => {
		// Check for invalid fields
		const newInvalidFields = structuredClone(defaultInvalidFields);
		if (!title.trim()) newInvalidFields.title = true;
		if (!content.trim()) newInvalidFields.content = true;
		if (newInvalidFields.title || newInvalidFields.content) {
			return setInvalidFields(newInvalidFields);
		}

		// Upload file
		if (!user) return;
		setIsDisabled(true);
		addFileMutation.mutate({ userId: user.uid, title, content });
	};

	const clearInvalidField = (field: string) => {
		if (!invalidFields.title && !invalidFields.content) return;
		setInvalidFields((prev) => ({ ...prev, [field]: false }));
	};

	const checkForUnsavedChanges = () => {
		if (title.trim() || content.trim()) setShowWarning(true);
		else closeModal();
	};

	return (
		<>
			<Modal
				closeModalFunction={isDisabled ? () => false : checkForUnsavedChanges}
				styleOverride="relative max-w-[800px] max-h-[calc(100dvh-10rem)]">
				{/* Main */}
				<div className="flex flex-col mb-2">
					<div className="flex justify-between gap-3">
						<TextInput
							type="text"
							onChange={setTitle}
							id="muistioTitle"
							placeholder="Set file name..."
							style={{ main: "bg-secondary/85 to-secondary/90" }}
							disabled={isDisabled}
							warning={invalidFields.title}
							onClick={() => clearInvalidField("title")}
						/>
						<div className="flex gap-3">
							<Button onClick={checkForUnsavedChanges} disabled={isDisabled}>
								Cancel
							</Button>
							<Button
								highlight
								onClick={validateFieldsAndUpload}
								disabled={isDisabled}
								style={{ main: "bg-opacity-80" }}>
								<LuPlus /> Add file
							</Button>
						</div>
					</div>
					<FilePreview
						isCreatingNewFile
						setContent={setContent}
						disabled={isDisabled}
						warning={invalidFields.content}
						onClick={() => clearInvalidField("content")}
					/>
				</div>
				{/* Inner Notification */}
				<AnimatePresence>
					{(addFileMutation.isPending || addFileMutation.isError) && (
						<motion.div className="absolute left-0 top-0 w-full flex justify-center pointer-events-none overflow-hidden">
							<InnerStatus
								content={
									addFileMutation.isPending
										? "Creating file..."
										: addFileMutation.isError && `Error: ${addFileMutation.error.message}`
								}
								warning={addFileMutation.isError}
								height="md"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</Modal>
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
							onClick={() => {
								setShowWarning(false);
								closeModal();
							}}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Discard changes
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CreateNewFile;
