import { useQueryClient } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FilesContext from "../context/FilesContext";
import { useContext } from "react";
import useIndexedDB from "./useIndexedDB";
import AuthContext from "../context/AuthContext";

const useLogOut = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { setFiles, setSelectedFile } = useContext(FilesContext);
	const { setEncryptionKeyChallenge } = useContext(AuthContext);
	const { clearEncryptionKey } = useIndexedDB();

	const handleLogOut = async () => {
		const auth = getAuth();
		return signOut(auth)
			.then(() => {
				queryClient.removeQueries();
				setFiles([]);
				setSelectedFile(null);
				setEncryptionKeyChallenge(null);
				clearEncryptionKey();
				navigate("/home");
			})
			.catch((error) => console.error(error));
	};

	return { handleLogOut };
};

export default useLogOut;
