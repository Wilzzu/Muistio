import PreviewOptions from "./PreviewOptions";
import { Dispatch, FC, SetStateAction, useContext, useRef, useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";
import { cn } from "../../lib/utils";
import FilesContext from "../../context/FilesContext";
import useUpdateFile from "../../hooks/useUpdateFile";
import InnerStatus from "../../components/common/InnerStatus";
import { AnimatePresence, motion } from "framer-motion";
import useFetchFileContent from "../../hooks/useFetchFileContent";
import ContentEditorAndPreview from "./ContentEditorAndPreview";
import useKeyboardSave from "../../hooks/useKeyboardSave";

type LandingOptions = {
	enabled: boolean;
	isPreviewingEdit: boolean;
	isEditing: boolean;
	landingContent: string;
	setLandingContent: Dispatch<SetStateAction<string>>;
};

type FilePreviewProps = {
	isCreatingNewFile?: boolean;
	setContent?: Dispatch<SetStateAction<string>>;
	disabled?: boolean;
	warning?: boolean;
	landing?: LandingOptions;
	onClick?: () => void;
};

const FilePreview: FC<FilePreviewProps> = ({
	isCreatingNewFile,
	setContent,
	disabled,
	warning,
	landing,
	onClick,
}) => {
	const { selectedFile } = useContext(FilesContext);
	const { data, isLoading, isRefetching, isError, error } = useFetchFileContent(
		selectedFile?.id || null
	);
	const { updateFileMutation, isUpdating } = useUpdateFile(onFileUpdated);
	const [isEditing, setIsEditing] = useState<boolean>(isCreatingNewFile || false);
	const [isPreviewingEdit, setIsPreviewingEdit] = useState(false);
	const editedFileCache = useRef<string>("");
	const editorRef = useRef<HTMLTextAreaElement>(null);
	useKeyboardSave(saveEdits, isEditing, isCreatingNewFile);

	const checkForUnsavedChanges = () => {
		if (landing?.enabled) return false;
		if (!isEditing || disabled || isCreatingNewFile) return false;
		if (editorRef?.current) editedFileCache.current = editorRef.current.value;
		if (data === editedFileCache.current) return false;
		if (isCreatingNewFile && !editedFileCache.current) return false;
		return true;
	};
	const blocker = useUnsavedChangesWarning(checkForUnsavedChanges); // For blocking navigation

	const startEditing = () => {
		if (isEditing || (!landing?.enabled && !data)) return;
		editedFileCache.current = landing?.landingContent || data || "";
		setIsEditing(true);
	};

	const toggleEditPreview = () => {
		// Exit edit preview
		if (isPreviewingEdit) {
			setIsPreviewingEdit(false);
			return;
		}

		// Store current changes in cache and preview file
		if (!editorRef?.current) return;
		editedFileCache.current = editorRef.current.value;
		setIsPreviewingEdit(true);
	};

	const handleDoubleClick = () => {
		// Return from edit preview
		if (isPreviewingEdit) {
			setIsPreviewingEdit(false);
			return;
		}
		startEditing();
	};

	const discardAndExit = () => {
		editedFileCache.current = "";
		setIsPreviewingEdit(false);
		setIsEditing(false);
	};

	function saveEdits() {
		// Set cache to current value
		if (editorRef?.current) editedFileCache.current = editorRef.current.value;

		// If landing page
		if (landing?.enabled) {
			landing.setLandingContent(editedFileCache.current);
			return discardAndExit();
		}

		// If no changes made
		if (!selectedFile || !editedFileCache.current || data === editedFileCache.current) {
			return discardAndExit();
		}

		// Update file
		updateFileMutation({ fileId: selectedFile.id, value: { content: editedFileCache.current } });
	}

	function onFileUpdated() {
		console.log("File updated");
		discardAndExit();
	}

	return (
		<>
			<div
				className={cn(
					"w-full lg:w-2/3 xl:w-[clamp(640px,60%,790px)] p-3 pr-1 shrink-0",
					{
						"lg:w-full xl:w-full p-0": isCreatingNewFile,
					},
					{
						"lg:w-full xl:w-full p-0": landing,
					}
				)}>
				{/* Sticky and border */}
				<div
					className={cn(
						"sticky top-3 p-[1px] rounded-[17px] bg-gradient-to-r from-primaryHighlight via-primaryHighlight/20 to-primaryHighlight overflow-hidden",
						{
							relative: isCreatingNewFile,
						},
						{ "from-red-600 via-red-600/20 to-red-600": warning }
					)}>
					{/* Main content wrapper */}
					<div
						className={cn(
							"relative w-full pt-6 pb-2 pl-5 pr-[0.35rem] rounded-2xl flex flex-col bg-gradient-radial from-secondary from-40% to-secondary/90 duration-700",
							{ "py-2": !isEditing },
							{ "pt-4 pb-2": isCreatingNewFile }
						)}>
						{/* Preview Options */}
						{(isCreatingNewFile || (!isLoading && !isError && !isRefetching)) && (
							<PreviewOptions
								selectedFile={selectedFile}
								isEditing={isEditing}
								startEditing={startEditing}
								saveEdits={saveEdits}
								isPreviewingEdit={isPreviewingEdit}
								toggleEditPreview={toggleEditPreview}
								hasUnsavedChanges={checkForUnsavedChanges}
								discardAndExit={discardAndExit}
								showOnlyEditButton={isCreatingNewFile}
								disabled={
									((isLoading || isRefetching || isUpdating) && !isCreatingNewFile) || disabled
								}
								content={data}
							/>
						)}
						{/* Main content with scroll */}
						<section
							onDoubleClick={handleDoubleClick}
							className={cn(
								"h-[calc(100dvh-8.6rem)] overflow-scroll scrollbar scrollbar-w-[6px] scrollbar-h-[6px] scrollbar-thumb-primaryHighlight/50 scrollbar-thumb-rounded-full duration-700",
								{
									"h-fit min-h-56 max-h-[calc(100dvh-20rem)]": isCreatingNewFile,
								},
								{ "h-[calc(100dvh-7.6rem)]": !isEditing },
								{
									"min-h-0 h-full aspect-[4/5]": landing,
								}
							)}
							onClick={onClick}>
							{/* Status */}
							<AnimatePresence>
								{!isCreatingNewFile && isEditing && (
									<motion.div className="absolute left-0 top-0 w-full flex justify-center pointer-events-none overflow-hidden">
										<InnerStatus content={"Editing file"} fadeOnHover />
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.4, ease: "easeOut" }}
											className="absolute top-0 left-0 w-full h-[1px] bg-gradient-radial from-accent to-90% to-transparent"
										/>
									</motion.div>
								)}
							</AnimatePresence>
							{/* Editor and Preview */}
							<ContentEditorAndPreview
								isEditing={isEditing}
								isPreviewingEdit={isPreviewingEdit}
								isCreatingNewFile={isCreatingNewFile}
								editorRef={editorRef}
								editedFileCache={editedFileCache}
								setContent={setContent}
								disabled={disabled || isUpdating || isLoading || isRefetching}
								isLoading={isLoading}
								isRefetching={isRefetching}
								isError={isError}
								error={error}
								data={landing?.landingContent || data}
								landing={landing?.enabled}
							/>
						</section>
					</div>
				</div>
			</div>

			{/* Unsaved changes warning modal*/}
			{blocker.state === "blocked" && (
				<Modal closeModalFunction={() => blocker.reset()}>
					<h1 className="font-bold">You have unsaved changes!</h1>
					<p>Are you sure you want to discard all changes and exit the editor?</p>
					<div className="w-full mt-2 flex justify-end font-semibold gap-2">
						<Button
							onClick={() => blocker.reset()}
							style={{
								main: "bg-[#2C3240] hover:bg-transparent",
							}}>
							Cancel
						</Button>
						<Button
							onClick={() => blocker.proceed()}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Exit editor
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default FilePreview;
