import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./context/NotificationProvider";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <LandingPage /> },
			{ path: "/home", element: <Home /> },
			{ path: "/file/:fileId", element: <Home /> },
			{ path: "/settings", element: <Settings /> },
			{ path: "/terms-of-service", element: <TermsOfService /> },
			{ path: "/privacy-policy", element: <PrivacyPolicy /> },
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<NotificationProvider>
					<RouterProvider router={router} />
				</NotificationProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
