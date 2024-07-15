import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

const markdown = `
# This is a heading!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta sint provident veniam dolorum corrupti, voluptatibus voluptatem consectetur error animi quam quia, non tempora harum sunt cumque pariatur ex modi neque?

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, odio. Cum est excepturi quam corrupti aperiam deserunt ad natus doloremque impedit laborum error, nobis tempora ex saepe voluptas praesentium cupiditate.

### Heading 3

Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde odit obcaecati eum alias illum consequatur asperiores nemo, dolore suscipit tempore cum officia qui aspernatur ipsa deserunt accusantium, optio minima iste?

# Heading again!

- Here
- are some
- list items

[Link to google](https://www.google.com)

Another type of link: www.google.com.

![Avatar](https://avatars.githubusercontent.com/u/11214356?v=4)
![Banner](https://i.imgur.com/q2uTmfW.png)

| Column 1   | Column 2   |
| ---------: | :--------- |
| Row 1 	 | Row 1/2    |
| Row 2      | Row 2/2 	  |

`;

const FilePreview = () => {
	return (
		<div className="w-1/2 p-3 pr-1">
			{/* Sticky and border */}
			<div className="sticky top-3 p-[1px] rounded-[17px] bg-gradient-to-r from-accent via-accent/20 to-accent shadow-accent/20 shadow-centered-sm">
				{/* Main content wrapper */}
				<div className="w-full py-4 pl-5 pr-3 rounded-2xl flex flex-col gap-8 bg-gradient-radial from-secondary from-40% to-secondary/90">
					{/* Main content with scroll */}
					<section className="h-[calc(100dvh-8.6rem)] overflow-y-scroll scrollbar scrollbar-w-[6px] scrollbar-thumb-primaryHighlight/50">
						<Markdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
							className={
								"prose prose-invert font-note prose-headings:mb-2 prose-h1:text-2xl prose-h1:font-semibold prose-h1:border-b-[1px] prose-h1:border-accent prose-h1:pb-1 prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-normal prose-p:text-white/90 prose-a:text-[#4dbaf8] prose-a:selection:text-black marker:text-accent prose-thead:border-accent prose-tr:border-accent"
							}>
							{markdown}
						</Markdown>
					</section>
				</div>
			</div>
		</div>
	);
};

export default FilePreview;
