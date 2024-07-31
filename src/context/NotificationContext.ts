import { createContext } from "react";
import { ShowNotificationProps } from "../types/types";

type NotificationContextType = {
	showNotification: ({ content, warning, disableAutoHide }: ShowNotificationProps) => void;
	isVisible: boolean;
	content: string;
	warning: boolean | null;
};

const defaultNotificationContext: NotificationContextType = {
	showNotification: () => {},
	isVisible: false,
	content: "",
	warning: null,
};

const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

export default NotificationContext;
