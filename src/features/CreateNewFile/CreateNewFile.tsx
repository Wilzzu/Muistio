import { FC, useContext, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";
import { addFile } from "../../firebase/firebase";
import Button from "../../components/common/Button";
import FilePreview from "../FilePreview/FilePreview";
import Modal from "../../components/common/Modal";

type CreateNewFileProps = {
	closeModal: () => void;
};

const CreateNewFile: FC<CreateNewFileProps> = ({ closeModal }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showWarning, setShowWarning] = useState(false);
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

	const checkForUnsavedChanges = () => {
		if (title.trim() || content.trim()) setShowWarning(true);
		else closeModal();
	};

	return (
		<>
			<Modal
				closeModalFunction={checkForUnsavedChanges}
				styleOverride="max-w-[800px] max-h-[calc(100dvh-10rem)]">
				<div className="flex flex-col mb-2">
					<p>
						{addFileMutation.isPending
							? "Uploading..."
							: addFileMutation.isSuccess
							? "Upload successful!"
							: addFileMutation.isError
							? "Error!"
							: ""}
					</p>
					<div className="flex justify-between gap-3">
						<input
							type="text"
							name="muistioTitle"
							id="muistioTitle"
							placeholder="Set new title"
							onChange={(e) => setTitle(e.target.value)}
							className="bg-primary rounded-lg px-2 outline-none"
						/>
						<div className="flex gap-3">
							<Button onClick={checkForUnsavedChanges}>Cancel</Button>
							<Button highlight onClick={uploadNewFile} style={{ main: "bg-opacity-80" }}>
								<LuPlus /> Add file
							</Button>
						</div>
					</div>
					<FilePreview isCreatingNewFile setContent={setContent} />
				</div>
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
