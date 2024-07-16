import { useCallback } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

const useUnsavedChangesWarning = (hasUnsavedChanges: () => boolean) => {
	const handleBeforeUnload = useCallback(
		(event: BeforeUnloadEvent) => {
			if (!hasUnsavedChanges()) return;
			event.preventDefault();
			event.returnValue = true; // Included for legacy support
		},
		[hasUnsavedChanges]
	);

	const blocker = useBlocker(hasUnsavedChanges); // For blocking navigation to diffrent routes inside the website
	useBeforeUnload((e) => handleBeforeUnload(e)); // For blocking navigation to different websites or refreshing the page

	return blocker;
};

export default useUnsavedChangesWarning;
