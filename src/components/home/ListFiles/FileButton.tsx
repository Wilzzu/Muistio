import { FC, FocusEvent, KeyboardEvent, useRef, useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { PiFileText } from "react-icons/pi";
import ButtonMoreOptions from "../../common/ButtonMoreOptions";
import { File } from "../../../types/types";
import Modal from "../../common/Modal";
import Button from "../../common/Button";

type FileButtonProps = {
	file: File;
};

const FileButton: FC<FileButtonProps> = ({ file }) => {
	const [isRenaming, setIsRenaming] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const escPressed = useRef<boolean>(false);

	const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") renameFile(event.currentTarget.value);
		if (event.code === "Escape") {
			escPressed.current = true;
			event.currentTarget.blur();
		}
	};

	const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
		// Ignore renaming if ESC is pressed
		if (escPressed.current) {
			escPressed.current = false;
			setIsRenaming(false);
			return;
		}
		renameFile(event.target.value);
	};

	const renameFile = (value: string) => {
		setIsRenaming(false);

		if (value === file.title) return;
		console.log("Renaming file to:", value);
	};

	const deleteFile = () => {
		setShowWarning(false);
		console.log("Deleting file:", file.title);
	};

	const options = [
		{ title: "Rename", action: () => setIsRenaming(true) },
		{ title: "Delete", action: () => setShowWarning(true), warning: true },
	];

	return (
		<li
			key={file.id}
			className="relative h-20 p-[1px] bg-gradient-to-br from-[#61718f] via-primaryHighlight to-[#61718f] rounded-[13px] duration-200">
			{/* File information */}
			<button
				disabled={isRenaming}
				className="h-full w-full flex flex-col p-4 bg-gradient-radial from-transparent to-primaryHighlight/20 bg-background/80 enabled:hover:bg-background/50 rounded-xl duration-200">
				{/* Title and Rename text input */}
				{isRenaming ? (
					<input
						type="text"
						defaultValue={file.title}
						autoFocus
						onBlur={(e) => onBlur(e)}
						onKeyDown={(e) => onInputKeyDown(e)}
						className="bg-transparent text-lg font-medium rounded-sm outline-none focus:outline-accent"
					/>
				) : (
					<h1 className="w-full truncate text-left text-lg font-medium">{file.title}</h1>
				)}
				{/* Other information */}
				<p className="flex gap-2 text-xs">
					<span>
						<LuCalendar className="inline-block mb-[0.1rem]" /> {file.dateModified.toDateString()}
					</span>
					<span>
						<PiFileText className="inline-block text-sm mb-[0.1rem]" /> {file.size + "KB"}
					</span>
				</p>
			</button>

			{/* More options button */}
			<div className="absolute top-1 right-1">
				<ButtonMoreOptions dropdownSide="left" options={options} />
			</div>

			{/* Rename modal */}
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
