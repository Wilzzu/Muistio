import { useContext, useState } from "react";
import { LuPlus } from "react-icons/lu";
import AuthContext from "../../context/AuthContext";
import Button from "../../components/common/Button";
import FilePreview from "../FilePreview/FilePreview";
import Modal from "../../components/common/Modal";
import TextInput from "../../components/common/TextInput";
import InnerStatus from "../../components/common/InnerStatus";
import { motion, AnimatePresence } from "framer-motion";
import useCreateFile from "../../hooks/useCreateFile";
import { useLocation, useNavigate } from "react-router-dom";

type InvalidFieldType = {
	title: boolean;
	content: boolean;
};

const defaultInvalidFields = {
	title: false,
	content: false,
};

const CreateNewFile = () => {
	const { user } = useContext(AuthContext);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showWarning, setShowWarning] = useState(false);
	const [invalidFields, setInvalidFields] = useState<InvalidFieldType>(defaultInvalidFields);
	const { createFileMutation, isPending, isError, error } = useCreateFile();
	const location = useLocation();
	const navigate = useNavigate();

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
		createFileMutation({ userId: user.uid, title, content });
	};

	const clearInvalidField = (field: string) => {
		if (!invalidFields.title && !invalidFields.content) return;
		setInvalidFields((prev) => ({ ...prev, [field]: false }));
	};

	const checkForUnsavedChanges = () => {
		if (title.trim() || content.trim()) setShowWarning(true);
		else navigate(location.pathname);
	};

	return (
		<>
			<Modal
				closeModalFunction={isPending ? () => false : checkForUnsavedChanges}
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
							disabled={isPending}
							warning={invalidFields.title}
							onClick={() => clearInvalidField("title")}
						/>
						<div className="flex gap-3">
							<Button onClick={checkForUnsavedChanges} disabled={isPending}>
								Cancel
							</Button>
							<Button
								highlight
								onClick={validateFieldsAndUpload}
								disabled={isPending}
								style={{ main: "bg-opacity-80" }}>
								<LuPlus /> Add file
							</Button>
						</div>
					</div>
					<FilePreview
						isCreatingNewFile
						setContent={setContent}
						disabled={isPending}
						warning={invalidFields.content}
						onClick={() => clearInvalidField("content")}
					/>
				</div>
				{/* Inner Notification */}
				<AnimatePresence>
					{(isPending || isError) && (
						<motion.div className="absolute left-0 top-0 w-full flex justify-center pointer-events-none overflow-hidden">
							<InnerStatus
								content={isPending ? "Creating file..." : isError ? `Error: ${error?.message}` : ""}
								warning={isError}
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
								navigate(location.pathname);
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
