import { useQuery } from "@tanstack/react-query";
import { getFileContent } from "../firebase/firebase";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useIndexedDB from "./useIndexedDB";

const useFetchFileContent = (fileId: string | null, enabled: boolean = true) => {
	const { user } = useContext(AuthContext);
	const { getEncryptionKey } = useIndexedDB();

	const fetchFiles = async () => {
		if (!user?.uid) throw new Error("User not found");
		if (!fileId) throw new Error("File not found");
		console.log("Fetching");
		const data = await getFileContent(user.uid, fileId, await getEncryptionKey());
		return data;
	};

	const { data, isLoading, isRefetching, isError, error, refetch } = useQuery({
		queryKey: ["fileContent", fileId],
		queryFn: fetchFiles,
		enabled: !!user?.uid && !!fileId && enabled,
		retry: 2,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: "always",
	});

	return { data, isLoading, isRefetching, isError, error, refetch };
};

export default useFetchFileContent;
