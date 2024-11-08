import { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/+/";

// Generate initial random encrypted text
const encryptedText = Array.from(
	{ length: 64 },
	() => characters[Math.floor(Math.random() * characters.length)]
).join("");

// Select random character
const getRandomCharacter = () => {
	return characters[Math.floor(Math.random() * characters.length)];
};

// Change 4 random characters evenly
const changeCharacters = (string: string) => {
	let newString = string;
	for (let i = 0; i < 4; i++) {
		const charIndex = Math.floor(Math.random() * 8) + i * 8;
		newString =
			newString.slice(0, charIndex) + getRandomCharacter() + newString.slice(charIndex + 1);
	}
	return newString;
};

const ScrollingEncryptedText = () => {
	// Split text into two parts
	const [text1, setText1] = useState(encryptedText.slice(0, 32));
	const [text2, setText2] = useState(encryptedText.slice(32));

	// Change characters
	useEffect(() => {
		const interval = setInterval(() => {
			setText1((prev) => changeCharacters(prev));
			setText2((prev) => changeCharacters(prev));
		}, 300);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative flex items-center h-full w-full verticalText font-mono text-accent text-4xl sm:text-5xl font-bold sm:leading-[1.4] overflow-hidden rotate-y-[30deg] maskText">
			<div className="absolute bottom-full animate-scroll-full-down shadow-accent drop-shadow-highlight">
				<p>{text1.slice(0, 8)}</p>
				<p>{text1.slice(8, 16)}</p>
				<p>{text1.slice(16, 24)}</p>
				<p>{text1.slice(24, 32)}</p>
			</div>
			<div className="absolute bottom-full animate-scroll-full-down-start-middle shadow-accent drop-shadow-highlight">
				<p>{text2.slice(0, 8)}</p>
				<p>{text2.slice(8, 16)}</p>
				<p>{text2.slice(16, 24)}</p>
				<p>{text2.slice(24, 32)}</p>
			</div>
		</div>
	);
};

export default ScrollingEncryptedText;
