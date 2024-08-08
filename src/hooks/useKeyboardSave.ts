/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useKeyboardSave = (callback: () => void, isEditing: boolean) => {
	useEffect(() => {
		if (!isEditing) return;

		const checkPressedKeys = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "s") {
				event.preventDefault();
				callback();
			}
		};

		window.addEventListener("keydown", checkPressedKeys);
		return () => window.removeEventListener("keydown", checkPressedKeys);
	}, [isEditing]);
};

export default useKeyboardSave;
