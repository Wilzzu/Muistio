import { FC, KeyboardEvent, useContext, useRef, useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { PiFileText } from "react-icons/pi";
import ButtonMoreOptions from "../../common/ButtonMoreOptions";
import { File } from "../../../types/types";
import Modal from "../../common/Modal";
import Button from "../../common/Button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import FilesContext from "../../../context/FilesContext";
import useDeleteFile from "../../../hooks/useDeleteFile";
import useUpdateFile from "../../../hooks/useUpdateFile";

type FileButtonProps = {
	file: File;
};

const FileButton: FC<FileButtonProps> = ({ file }) => {
	const [isRenaming, setIsRenaming] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [renameValue, setRenameValue] = useState(file.title);
	const escPressed = useRef<boolean>(false);
	const navigate = useNavigate();
	const { selectedFile } = useContext(FilesContext);
	const { deleteFileMutation, isDeleting } = useDeleteFile(file.id);
	const { updateFileMutation, isUpdating } = useUpdateFile(() => setRenameValue(""));

	const startRenaming = () => {
		setRenameValue(file.title);
		setIsRenaming(true);
	};

	const renameFile = () => {
		setIsRenaming(false);

		if (renameValue.trim() === file.title.trim()) return;
		updateFileMutation({ fileId: file.id, title: renameValue });
	};

	const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") renameFile();
		if (event.code === "Escape") {
			escPressed.current = true;
			event.currentTarget.blur();
		}
	};

	const onBlur = () => {
		// Ignore renaming if ESC is pressed
		if (escPressed.current) {
			escPressed.current = false;
			setIsRenaming(false);
			return;
		}
		renameFile();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
	};

	const downloadFile = () => {
		const blob = new Blob([file.content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = file.title;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Revoke the object URL after download has started
		URL.revokeObjectURL(url);
	};

	const deleteFile = () => {
		deleteFileMutation();
		setShowWarning(false);
		console.log("Deleting file:", file.title);
	};

	const options = [
		{ title: "Rename", action: startRenaming },
		{ title: "Download", action: downloadFile },
		{ title: "Delete", action: () => setShowWarning(true), warning: true },
	];

	return (
		<li
			key={file.id}
			className={cn(
				"relative h-20 p-[1px] bg-gradient-radial from-[#465268] to-primaryHighlight rounded-[13px] duration-500",
				{
					"from-accent/60 to-accent shadow-accent shadow-[0_0_24px_-14px]":
						file.id === selectedFile?.id,
				}
			)}>
			{/* File information */}
			<button
				onClick={() => navigate(file.id === selectedFile?.id ? `/` : `/file/${file.id}`)}
				disabled={isRenaming || isDeleting}
				className={cn(
					"h-full w-full flex flex-col p-4 bg-gradient-radial from-[#151A22] to-[#1B1D26]/95 rounded-xl",
					{
						"enabled:hover:bg-primary/60": file.id !== selectedFile?.id,
					}
				)}>
				{/* Title and Rename text input */}
				{isRenaming ? (
					<input
						type="text"
						defaultValue={file.title}
						autoFocus
						disabled={isUpdating}
						onBlur={onBlur}
						onKeyDown={(e) => onInputKeyDown(e)}
						onChange={(e) => setRenameValue(e.target.value)}
						className="bg-transparent text-lg font-medium rounded-sm outline-none outline-1 outline-accent w-[93%] disabled:animate-pulse"
					/>
				) : (
					<h1
						className={cn("w-full truncate text-left text-lg font-medium", {
							"animate-pulse": isUpdating,
						})}>
						{isUpdating ? renameValue : file.title}
					</h1>
				)}
				{/* Other information */}
				<p className="flex gap-2 text-xs">
					<span>
						<LuCalendar className="inline-block mb-[0.1rem]" />{" "}
						{moment(file.dateModified.toDate()).format("DD.MM.YYYY, HH:mm")}
					</span>
					<span>
						<PiFileText className="inline-block text-sm mb-[0.1rem]" /> {formatFileSize(file.size)}
					</span>
				</p>
			</button>

			{/* More options button */}
			<div className="absolute top-1 right-1">
				<ButtonMoreOptions dropdownSide="left" options={options} disabled={isDeleting} />
			</div>

			{/* Delete modal */}
			{showWarning && (
				<Modal closeModalFunction={() => setShowWarning(false)}>
					<h1 className="font-bold">Delete file?</h1>
					<p>
						Are you sure you want to delete <b>{file.title}</b> file?
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
							onClick={deleteFile}
							style={{
								border: "from-red-500 via-red-500/50 to-red-500",
								main: "bg-gradient-radial bg-primary/50 hover:bg-transparent",
							}}>
							Delete
						</Button>
					</div>
				</Modal>
			)}
		</li>
	);
};

export default FileButton;
