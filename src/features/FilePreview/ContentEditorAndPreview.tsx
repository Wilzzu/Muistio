import { Dispatch, FC, MutableRefObject, RefObject, SetStateAction } from "react";
import { cn } from "../../lib/utils";
import Markdown from "react-markdown";
import { ImSpinner2 } from "react-icons/im";
import ReactTextareaAutosize from "react-textarea-autosize";
import { IoIosSad } from "react-icons/io";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

type ContentEditorAndPreviewProps = {
	isEditing: boolean;
	isPreviewingEdit: boolean;
	isCreatingNewFile?: boolean;
	editorRef: RefObject<HTMLTextAreaElement> | null;
	editedFileCache: MutableRefObject<string>;
	setContent?: Dispatch<SetStateAction<string>>;
	disabled?: boolean;
	isLoading: boolean;
	isRefetching: boolean;
	isError: boolean;
	error: Error | null;
	data: string | undefined;
};

const MarkdownPreview: FC<{ content: string; disabled?: boolean }> = ({ content, disabled }) => (
	<Markdown
		remarkPlugins={[remarkGfm]}
		rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
		className={cn(
			"prose prose-invert font-light text-white prose-headings:mt-6 prose-headings:mb-[0.85rem] prose-h1:text-2xl prose-h1:font-medium prose-h1:border-b-[1px] prose-h1:border-accent prose-h1:pb-1 prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-p:leading-6 prose-a:text-[#4dbaf8] prose-a:selection:text-black marker:text-accent prose-thead:border-accent prose-tr:border-accent break-words pr-2",
			{
				"animate-pulse pointer-events-none select-none": disabled,
			}
		)}>
		{content}
	</Markdown>
);

const ContentEditorAndPreview: FC<ContentEditorAndPreviewProps> = ({
	isEditing,
	isPreviewingEdit,
	isCreatingNewFile,
	editorRef,
	editedFileCache,
	setContent,
	disabled,
	isLoading,
	isRefetching,
	isError,
	error,
	data,
}) => {
	if (isError) {
		return (
			<div className="min-h-fit h-2/5 flex flex-col gap-2 items-center justify-center">
				<IoIosSad className="text-5xl text-warning" />
				<div className="text-center font-semibold">
					<h1 className="text-xl text-warning">Error fetching file content!</h1>
					<p className="text-sm opacity-80">{error?.message}</p>
				</div>
			</div>
		);
	}
	if (isLoading || isRefetching) {
		return (
			<div className="min-h-fit h-2/5 flex flex-col gap-2 items-center justify-center animate-pulse opacity-80">
				<h1 className="text-xl font-semibold">Loading file content...</h1>
				<ImSpinner2 className="animate-spin text-4xl" />
			</div>
		);
	}
	if (!isEditing) return <MarkdownPreview content={data || "No content"} disabled={disabled} />;
	if (!isPreviewingEdit) {
		return (
			<ReactTextareaAutosize
				ref={editorRef}
				name="muistioFileEditor"
				id="muistioFileEditor"
				disabled={disabled}
				defaultValue={editedFileCache.current}
				className={cn(
					"w-full h-fit bg-transparent resize-none outline-none overflow-hidden disabled:opacity-80 disabled:animate-pulse disabled:pointer-events-none disabled:select-none",
					{
						"min-h-44": isCreatingNewFile,
					}
				)}
				onChange={(e) => isCreatingNewFile && setContent && setContent(e.target.value)}
			/>
		);
	}
	return <MarkdownPreview content={editedFileCache.current} disabled={disabled} />;
};

export default ContentEditorAndPreview;