import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilePreview from "../../features/FilePreview/FilePreview";

const defaultContent: string = `
# WILZZU.DEV

![Banner](https://i.imgur.com/LKhoc9f.png)
A React-based website showcasing my projects and providing more information about myself.
Built with a design-first approach, emphasizing smooth animations and transitions handcrafted with Framer Motion.

## Live Site

Check out the live version of the website:
[wilzzu.dev](https://wilzzu.dev/)

![Screenshots](https://i.imgur.com/makqbpP.png)

## Features

- Showcase of my projects with descriptions, screenshots and links
- Demo versions of some projects, so anyone can try them out
- Smooth animations and transitions
- Information about me and links to my socials
- Responsive design

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion

## Installation and Setup

To run the project locally:

1. **Clone the repository:**

   \`\`\`
   git clone https://github.com/Wilzzu/wilzzu.dev.git
   cd wilzzu.dev
   \`\`\`

2. **Install dependencies:**

   \`\`\`
   npm install
   \`\`\`

3. **Start the development server:**

   \`\`\`
   npm run dev
   \`\`\`

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Wilzzu/wilzzu.dev/blob/main/LICENSE) file for details.
`;

const LandingEditor = () => {
	const [landingContent, setLandingContent] = useState("# W");
	const [interactedLanding, setInteractedLanding] = useState(false);
	const [scrolledLanding, setScrolledLanding] = useState(false);
	useEffect(() => {
		if (interactedLanding) return;
		if (landingContent.length < defaultContent.length) {
			const timeout = setTimeout(() => {
				setLandingContent(defaultContent.slice(0, landingContent.length + 1));
			}, 3);

			return () => clearTimeout(timeout);
		}
	}, [landingContent, interactedLanding]);

	return (
		<FilePreview
			landing={{
				enabled: true,
				landingContent,
				setLandingContent,
				interactedLanding,
				setInteractedLanding,
				scrolledLanding,
				setScrolledLanding,
			}}
		/>
	);
};

export default LandingEditor;
