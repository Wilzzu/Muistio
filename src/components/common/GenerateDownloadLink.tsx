import { FC, ReactNode, useContext, useEffect, useState } from "react";
import NotificationContext from "../../context/NotificationContext";

type GenerateDownloadLinkProps = {
	title: string;
	content: string | undefined;
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
	const { showNotification } = useContext(NotificationContext);

	// Revoke the object URL after download has started
	useEffect(() => {
		if (downloadUrl) {
			return () => URL.revokeObjectURL(downloadUrl);
		}
	}, [downloadUrl]);

	// Create file and download link
	const handleDownload = () => {
		if (!content) {
			setDownloadUrl("");
			return showNotification({ content: "File content is empty", warning: true });
		}
		const file = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(file);
		setDownloadUrl(url);
		showNotification({ content: "Downloading file..." });
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
