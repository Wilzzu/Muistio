import { useEffect, useState } from "react";

const useCheckMobile = () => {
	const [width, setWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return width <= 640;
};

export default useCheckMobile;
