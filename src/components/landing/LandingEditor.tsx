import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import FilePreview from "../../features/FilePreview/FilePreview";
import defaultContent from "../../data/landingEditorContent";

const LandingEditor: FC<{ setHasInteracted: Dispatch<SetStateAction<boolean>> }> = ({
	setHasInteracted,
}) => {
	const [landingContent, setLandingContent] = useState("# W");
	const [interactedLanding, setInteractedLanding] = useState(false);
	const [scrolledLanding, setScrolledLanding] = useState(false);
	useEffect(() => {
		if (interactedLanding) return setHasInteracted(true);
		if (landingContent.length < defaultContent.length) {
			const timeout = setTimeout(() => {
				setLandingContent(defaultContent.slice(0, landingContent.length + 1));
			}, 3);

			return () => clearTimeout(timeout);
		}
	}, [landingContent, interactedLanding, setHasInteracted]);

	return (
		<FilePreview
			landing={{
				enabled: true,
				landingContent,
				setLandingContent,
				interactedLanding,
				setInteractedLanding,
				scrolledLanding,
				setScrolledLanding,
			}}
		/>
	);
};

export default LandingEditor;
