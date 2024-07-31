import { FC, ReactNode, useState } from "react";
import NotificationContext from "./NotificationContext";
import { ShowNotificationProps } from "../types/types";

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [content, setContent] = useState("");
	const [warning, setWarning] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const showNotification = ({ content, warning, disableAutoHide }: ShowNotificationProps) => {
		// Clear existing timeout if there's a new notification
		if (timeoutId) clearTimeout(timeoutId);

		setContent(content);
		setWarning(!!warning);
		setIsVisible(true);

		// Hide the notification after 3 or 5 seconds
		if (disableAutoHide) return;
		const timeout = setTimeout(() => setIsVisible(false), warning ? 5000 : 3000);

		setTimeoutId(timeout);
	};

	return (
		<NotificationContext.Provider value={{ content, warning, isVisible, showNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
