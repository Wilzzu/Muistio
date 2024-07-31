import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import PreviewOptions from "./PreviewOptions";
import { Dispatch, FC, SetStateAction, useContext, useRef, useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";
import ReactTextareaAutosize from "react-textarea-autosize";
import { cn } from "../../lib/utils";
import FilesContext from "../../context/FilesContext";
import useUpdateFile from "../../hooks/useUpdateFile";
import InnerStatus from "../../components/common/InnerStatus";
import { AnimatePresence, motion } from "framer-motion";

const defaultText = "# Add your content here";

const MarkdownPreview: FC<{ content: string }> = ({ content }) => (
	<Markdown
		remarkPlugins={[remarkGfm]}
		rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
		className={
			"prose prose-invert font-light text-white prose-headings:mt-6 prose-headings:mb-[0.85rem] prose-h1:text-2xl prose-h1:font-medium prose-h1:border-b-[1px] prose-h1:border-accent prose-h1:pb-1 prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-p:leading-6 prose-a:text-[#4dbaf8] prose-a:selection:text-black marker:text-accent prose-thead:border-accent prose-tr:border-accent"
		}>
		{content}
	</Markdown>
);

type FilePreviewProps = {
	isCreatingNewFile?: boolean;
	setContent?: Dispatch<SetStateAction<string>>;
	disabled?: boolean;
};

const FilePreview: FC<FilePreviewProps> = ({ isCreatingNewFile, setContent, disabled }) => {
	const { selectedFile } = useContext(FilesContext);
	const { updateFileMutation, isUpdating } = useUpdateFile(onFileUpdated);
	const [isEditing, setIsEditing] = useState<boolean>(isCreatingNewFile || false);
	const [isPreviewingEdit, setIsPreviewingEdit] = useState(false);
	const editedFileCache = useRef<string>(defaultText);
	const editorRef = useRef<HTMLTextAreaElement>(null);

	const checkForUnsavedChanges = () => {
		if (!isEditing || disabled) return false;
		if (editorRef?.current) editedFileCache.current = editorRef.current.value;
		if (selectedFile?.content === editedFileCache.current) return false;
		if (isCreatingNewFile && editedFileCache.current === defaultText) return false;
		return true;
	};
	const blocker = useUnsavedChangesWarning(checkForUnsavedChanges); // For blocking navigation

	const startEditing = () => {
		if (isEditing || !selectedFile?.content) return;
		editedFileCache.current = selectedFile.content;
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

	const saveEdits = () => {
		if (editorRef?.current) editedFileCache.current = editorRef.current.value;
		if (!selectedFile || selectedFile?.content === editedFileCache.current) return discardAndExit(); // No changes made

		updateFileMutation({ fileId: selectedFile.id, content: editedFileCache.current });
	};

	function onFileUpdated() {
		console.log("File updated");
		discardAndExit();
	}

	return (
		<>
			<div
				className={cn("w-1/2 p-3 pr-1", {
					"w-full p-0": isCreatingNewFile,
				})}>
				{/* Sticky and border */}
				<div
					className={cn(
						"sticky top-3 p-[1px] rounded-[17px] bg-gradient-to-r from-primaryHighlight via-primaryHighlight/20 to-primaryHighlight overflow-hidden",
						{
							relative: isCreatingNewFile,
						}
					)}>
					{/* Main content wrapper */}
					<div className="relative w-full py-4 pl-5 pr-[0.35rem] rounded-2xl flex flex-col bg-gradient-radial from-secondary from-40% to-secondary/90">
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
							disabled={isUpdating}
						/>
						{/* Main content with scroll */}
						<section
							onDoubleClick={handleDoubleClick}
							className={cn(
								"h-[calc(100dvh-8.6rem)] overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight/50 scrollbar-thumb-rounded-full",
								{
									"h-fit min-h-48 max-h-[calc(100dvh-20rem)]": isCreatingNewFile,
								}
							)}>
							{/* Status */}
							<AnimatePresence>
								{!isCreatingNewFile && isEditing && (
									<motion.div className="absolute left-0 top-0 w-full flex justify-center pointer-events-none overflow-hidden">
										<InnerStatus content={"Editing file"} />
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
							{isEditing ? (
								<>
									{isPreviewingEdit ? (
										<MarkdownPreview content={editedFileCache.current} />
									) : (
										<ReactTextareaAutosize
											ref={editorRef}
											name="muistioFileEditor"
											id="muistioFileEditor"
											disabled={disabled}
											defaultValue={editedFileCache.current}
											className={cn(
												"w-full h-fit bg-transparent resize-none outline-none disabled:opacity-50",
												{
													"min-h-44": isCreatingNewFile,
												}
											)}
											onChange={(e) =>
												isCreatingNewFile && setContent && setContent(e.target.value)
											}
										/>
									)}
								</>
							) : (
								<MarkdownPreview content={selectedFile?.content || "No content"} />
							)}
						</section>
					</div>
				</div>
			</div>

			{/* Unsaved changes warning modal*/}
			{blocker.state === "blocked" && (
				<Modal closeModalFunction={() => blocker.reset()}>
					<h1 className="font-bold">You have unsaved changes!</h1>
					<p>Are you sure you want to leave this page?</p>
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
							Leave page
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default FilePreview;
