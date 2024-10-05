/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import FilesContext from "../../../context/FilesContext";
import { File, FilteredList } from "../../../types/types";

type SearchProps = {
	setFilteredList: Dispatch<SetStateAction<FilteredList>>;
};

const Search: FC<SearchProps> = ({ setFilteredList }) => {
	const { files } = useContext(FilesContext);
	const [searchInput, setSearchInput] = useState("");

	const onChange = (input: string) => {
		setSearchInput(input);

		// If we aren't searching, set searching to false
		if (input?.trim().length <= 0) {
			return setFilteredList((prev) => ({ ...prev, isSearching: false }));
		}

		// Modify and split input
		const splitInput = input.trim().toLowerCase().split(" ");

		// Filter files, check if all input blocks are found in the file name
		const foundFiles = files.filter((file: File) => {
			return splitInput.every((block: string) => file.title.trim().toLowerCase().includes(block));
		});

		setFilteredList({ files: foundFiles, isSearching: true });
	};

	useEffect(() => {
		if (searchInput) onChange(searchInput);
	}, [files]);

	return (
		<div className="sticky top-0 bg-gradient-to-b from-background from-80% to-transparent z-[3] py-3">
			<div className="p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200 h-11">
				<div className="w-full h-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-radial from-transparent bg-secondary to-secondary/60 hover:bg-[#252A35] active:bg-[#252A35] duration-200 text-sm font-semibold outline-none">
					<IoSearch />
					<input
						onChange={(e) => onChange(e.target.value)}
						onFocus={(e) => e.target.select()}
						type="text"
						name="muistioSearch"
						id="muistioSearch"
						placeholder="Search file"
						className="w-full h-full bg-transparent outline-none"
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
