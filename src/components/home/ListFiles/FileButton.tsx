import { FC, useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { PiFileText } from "react-icons/pi";
import ButtonMoreOptions from "../../common/ButtonMoreOptions";
import { File } from "../../../types/types";

type FileButtonProps = {
	file: File;
};

const FileButton: FC<FileButtonProps> = ({ file }) => {
	const [isRenaming, setIsRenaming] = useState(false);

	const renameFile = (value: string) => {
		console.log("Renaming file to:", value);
		setIsRenaming(false);
	};

	const deleteFile = () => {
		// TODO: Add confimation to this
		console.log("Deleting file:", file.title);
	};

	const options = [
		{ title: "Rename", action: () => setIsRenaming(true) },
		{ title: "Delete", action: deleteFile, warning: true },
	];

	return (
		<li
			key={file.id}
			className="relative h-20 p-[1px] bg-gradient-to-br from-[#61718f] via-primaryHighlight to-[#61718f] rounded-[13px] duration-200">
			{/* File information */}
			<button
				disabled={isRenaming}
				className="h-full w-full flex flex-col p-4 bg-gradient-radial from-transparent to-primaryHighlight/30 bg-background/70 hover:bg-background/50 rounded-xl duration-200">
				{/* Title and Rename text input */}
				{isRenaming ? (
					<input
						type="text"
						defaultValue={file.title}
						autoFocus
						onBlur={(e) => {
							renameFile(e.target.value);
						}}
						onKeyDown={(e) => e.code === "Enter" && renameFile(e.currentTarget.value)}
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
		</li>
	);
};

export default FileButton;
