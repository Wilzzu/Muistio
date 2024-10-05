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
	landing?: boolean;
};

type MarkdownPreviewProps = {
	content: string;
	disabled?: boolean;
	landing?: boolean;
};

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ content, disabled, landing }) => (
	<Markdown
		remarkPlugins={[remarkGfm]}
		rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
		className={cn(
			"prose prose-invert font-light text-white prose-headings:mt-6 prose-headings:mb-[0.85rem] prose-h1:text-2xl prose-h1:font-medium prose-h1:border-b-[1px] prose-h1:border-accent prose-h2:border-b-[1px] prose-h2:border-accent/80 prose-h1:pb-1 prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-p:leading-6 prose-a:text-textAccent prose-a:selection:text-black marker:text-accent prose-thead:border-accent prose-tr:border-accent break-words pr-2",
			{
				"animate-pulse pointer-events-none select-none": disabled,
			},
			{
				"prose-sm text-xs prose-headings:mt-4 prose-h1:pb-0 prose-h1:text-base sm:prose-h1:text-lg prose-h2:text-sm sm:prose-h2:text-base prose-h3:text-xs sm:prose-h3:text-sm prose-p:text-[0.6rem] sm:prose-p:text-xs sm:prose-p:leading-5 sm:prose-img:max-w-[80%] prose-li:text-[0.6rem] sm:prose-li:text-xs select-text":
					landing,
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
	isError,
	error,
	data,
	landing,
}) => {
	if (isError && !isCreatingNewFile) {
		return (
			<div className="min-h-fit h-2/5 flex flex-col gap-1 sm:gap-2 items-center justify-center">
				<IoIosSad className="text-3xl sm:text-5xl text-warning" />
				<div className="text-center">
					<h1 className="text-base sm:text-xl text-warning">Error fetching file content!</h1>
					<p className="text-xs sm:text-sm opacity-80">{error?.message}</p>
				</div>
			</div>
		);
	}
	if (isLoading && !isCreatingNewFile) {
		return (
			<div className="min-h-fit h-2/5 flex flex-col gap-3 items-center justify-center animate-pulse opacity-80">
				<h1 className="text-base sm:text-xl">Loading file content...</h1>
				<ImSpinner2 className="animate-spin text-2xl sm:text-4xl" />
			</div>
		);
	}
	if (!isEditing)
		return <MarkdownPreview content={data || "No content"} disabled={disabled} landing={landing} />;
	if (!isPreviewingEdit) {
		return (
			<ReactTextareaAutosize
				ref={editorRef}
				name="muistioFileEditor"
				id="muistioFileEditor"
				disabled={disabled}
				defaultValue={editedFileCache.current}
				placeholder={isCreatingNewFile ? "# Add content here..." : ""}
				className={cn(
					"w-full h-fit bg-transparent resize-none outline-none overflow-hidden disabled:opacity-80 disabled:animate-pulse disabled:pointer-events-none disabled:select-none",
					{
						"min-h-44": isCreatingNewFile,
					},
					{
						"text-xs sm:text-sm": landing,
					}
				)}
				onChange={(e) => isCreatingNewFile && setContent && setContent(e.target.value)}
			/>
		);
	}
	return (
		<MarkdownPreview content={editedFileCache.current} disabled={disabled} landing={landing} />
	);
};

export default ContentEditorAndPreview;
