import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useClearValues from "./useClearValues";

const useLogOut = () => {
	const navigate = useNavigate();
	const { clear } = useClearValues();

	const handleLogOut = async () => {
		const auth = getAuth();
		return signOut(auth)
			.then(() => {
				clear();
				navigate("/home");
			})
			.catch((error) => console.error(error));
	};

	return { handleLogOut };
};

export default useLogOut;
