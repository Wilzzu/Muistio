import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
	const navigate = useNavigate();

	const handleLogOut = async () => {
		const auth = getAuth();
		return signOut(auth)
			.then(() => navigate("/"))
			.catch((error) => console.error(error));
	};

	return { handleLogOut };
};

export default useLogOut;
