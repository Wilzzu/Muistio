import { useState } from "react";
import { cn } from "../../../lib/utils";
import { IoSearch } from "react-icons/io5";

const Search = () => {
	const [input, setInput] = useState("");

	const onChange = (e: string) => {
		setInput(e);
	};

	console.log(input);

	return (
		<div
			className={cn(
				"p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200 h-11"
			)}>
			<div className="w-full h-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-secondary to-secondary/60 hover:bg-secondary/50 active:bg-secondary/50 duration-200 text-sm font-semibold outline-none">
				<IoSearch />
				<input
					onChange={(e) => onChange(e.target.value)}
					type="text"
					name="muistioSearch"
					id="muistioSearch"
					placeholder="Search file"
					className="w-full h-full bg-transparent outline-none"
				/>
			</div>
		</div>
	);
};

export default Search;
