import { useContext, useState } from "react";
import FilePreview from "../features/FilePreview/FilePreview";
import Button from "../components/common/Button";
import { LuPlus } from "react-icons/lu";
import AuthContext from "../context/AuthContext";
import { addFile } from "../firebase/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateNewFile = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();

	// Use React Query to keep track of mutation state
	const addFileMutation = useMutation({
		mutationFn: ({ userId, title, content }: { userId: string; title: string; content: string }) =>
			addFile(userId, title, content),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["files", user?.uid] }),
	});

	const uploadNewFile = () => {
		if (title.trim() && content.trim() && user) {
			addFileMutation.mutate({ userId: user.uid, title, content });
		}
	};

	return (
		<main className="flex flex-col items-center">
			<p>
				{addFileMutation.isPending
					? "Uploading..."
					: addFileMutation.isSuccess
					? "Upload successful!"
					: addFileMutation.isError
					? "Error!"
					: ""}
			</p>
			<div className="w-1/2 min-w-[800px] flex justify-between">
				<input
					type="text"
					name="muistioTitle"
					id="muistioTitle"
					placeholder="Set new title"
					onChange={(e) => setTitle(e.target.value)}
					className="bg-primary rounded-lg px-2 outline-none"
				/>
				<Button highlight onClick={uploadNewFile} style={{ main: "bg-opacity-80" }}>
					<LuPlus /> Add file
				</Button>
			</div>
			<FilePreview isCreatingNewFile setContent={setContent} />
		</main>
	);
};

export default CreateNewFile;
