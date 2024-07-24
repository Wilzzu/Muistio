import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import CreateNewFile from "./pages/CreateNewFile";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthProvider from "./context/AuthProvider";
import FilesProvider from "./context/FilesProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/new", element: <CreateNewFile /> },
			{ path: "/login", element: <Login /> },
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<FilesProvider>
					<RouterProvider router={router} />
				</FilesProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
