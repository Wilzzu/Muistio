import { useState } from "react";
import FilePreview from "../features/FilePreview/FilePreview";
import Button from "../components/common/Button";
import { LuPlus } from "react-icons/lu";

const CreateNewFile = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const newPost = () => {
		console.log(title);
		console.log(content);
		if (title.trim() && content.trim()) console.log("Can be posted");
	};
	return (
		<main className="flex flex-col items-center">
			<div className="w-1/2 min-w-[800px] flex justify-between">
				<input
					type="text"
					name="muistioTitle"
					id="muistioTitle"
					placeholder="Set new title"
					onChange={(e) => setTitle(e.target.value)}
					className="bg-primary rounded-lg px-2 outline-none"
				/>
				<Button highlight onClick={newPost} style={{ main: "bg-opacity-80" }}>
					<LuPlus /> Add file
				</Button>
			</div>
			<FilePreview isCreatingNewFile setContent={setContent} />
		</main>
	);
};

export default CreateNewFile;
