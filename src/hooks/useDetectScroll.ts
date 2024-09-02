/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useRef } from "react";

const useDetectScroll = (
	callback: (event: WheelEvent) => void,
	ignoreId?: string,
	ignoreRef?: RefObject<HTMLElement>
) => {
	const scrollBuffer = useRef(false);

	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			if (scrollBuffer.current) return;

			// Ignore scroll if it's triggered inside the ignoreRef element
			if (ignoreRef && ignoreRef.current && ignoreRef.current.contains(event.target as Node))
				return;

			// If wheel event is triggered inside the ignoreId element, ignore it
			if (ignoreId) {
				const target = event.target as HTMLElement;
				let element: HTMLElement | null = target;

				// Go through the parent elements and check if any of them match the ignoreId
				while (element) {
					if (element && element.id === ignoreId) return;
					element = element.parentElement;
				}
			}
			callback(event);

			// Buffer scroll so user doesn't skip multiple sections
			scrollBuffer.current = true;
			setTimeout(() => (scrollBuffer.current = false), 700);
		};

		window.addEventListener("wheel", handleScroll);
		return () => window.removeEventListener("wheel", handleScroll);
	}, []);
};

export default useDetectScroll;
