import { useQueryClient } from "@tanstack/react-query";
import useIndexedDB from "./useIndexedDB";
import { useContext } from "react";
import FilesContext from "../context/FilesContext";
import AuthContext from "../context/AuthContext";

const useClearValues = () => {
	const queryClient = useQueryClient();
	const { setFiles, setSelectedFile } = useContext(FilesContext);
	const { setEncryptionKeyChallenge } = useContext(AuthContext);
	const { clearEncryptionKey } = useIndexedDB();

	const clear = () => {
		queryClient.removeQueries();
		setFiles([]);
		setSelectedFile(null);
		setEncryptionKeyChallenge(null);
		clearEncryptionKey();
	};

	return { clear };
};

export default useClearValues;
