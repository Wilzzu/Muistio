import { FC, ReactNode, useEffect, useState } from "react";

type GenerateDownloadLinkProps = {
	title: string;
	content: string;
	disabled?: boolean;
	children: ReactNode;
};

const GenerateDownloadLink: FC<GenerateDownloadLinkProps> = ({
	title,
	content,
	disabled,
	children,
}) => {
	const [downloadUrl, setDownloadUrl] = useState("");

	// Revoke the object URL after download has started
	useEffect(() => {
		if (downloadUrl) {
			return () => URL.revokeObjectURL(downloadUrl);
		}
	}, [downloadUrl]);

	// Create file and download link
	const handleDownload = () => {
		const file = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(file);
		setDownloadUrl(url);
	};

	return (
		<a
			href={disabled ? "#" : downloadUrl}
			download={disabled ? null : `${title}.txt`}
			onClick={disabled ? () => {} : handleDownload}
			className={disabled ? "pointer-events-none" : ""}>
			{children}
		</a>
	);
};

export default GenerateDownloadLink;
