import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../firebase/firebase";
import { useContext } from "react";
import FilesContext from "../context/FilesContext";
import { File } from "../types/types";
import AuthContext from "../context/AuthContext";

const useFetchFiles = () => {
	const { setFiles } = useContext(FilesContext);
	const { user } = useContext(AuthContext);

	const fetchFiles = async () => {
		if (!user?.uid) throw new Error("User not found");
		const querySnapshot = await getFiles(user.uid);
		const allFiles: File[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			allFiles.push({
				id: doc.id,
				title: data.title,
				dateModified: data.dateModified,
				size: data.size,
			});
		});
		setFiles(allFiles);
		return allFiles;
	};

	const { isLoading, isRefetching, isError, error } = useQuery({
		queryKey: ["files", user?.uid],
		queryFn: fetchFiles,
		enabled: !!user?.uid,
		retry: 2,
	});

	return { isLoading, isRefetching, isError, error };
};

export default useFetchFiles;
