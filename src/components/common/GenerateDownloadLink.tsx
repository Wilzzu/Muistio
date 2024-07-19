import { FC, ReactNode, useEffect, useState } from "react";

type GenerateDownloadLinkProps = {
	title: string;
	content: string;
	children: ReactNode;
};

const GenerateDownloadLink: FC<GenerateDownloadLinkProps> = ({ title, content, children }) => {
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
		<a href={downloadUrl} download={`${title}.txt`} onClick={handleDownload}>
			{children}
		</a>
	);
};

export default GenerateDownloadLink;
