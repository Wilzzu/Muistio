import { RefObject, useCallback, useEffect } from "react";

const useClickOutside = (
	mainRef: RefObject<HTMLElement>,
	callback: () => void,
	childRef?: RefObject<HTMLElement>
) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			// Return if main or child ref contains the clicked element
			if (mainRef.current && mainRef.current.contains(event.target as Node)) return;
			if (childRef && childRef.current && childRef.current.contains(event.target as Node)) return;

			// Fire callback function
			callback();
		},
		[mainRef, childRef, callback]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);
};

export default useClickOutside;
