import { FC, useContext } from "react";
import FileButton from "./FileButton";
import FilesContext from "../../../context/FilesContext";
import { File, FilteredList } from "../../../types/types";
import useFetchFiles from "../../../hooks/useFetchFiles";

type ListFilesProps = {
	filteredList: FilteredList;
};

const ListFiles: FC<ListFilesProps> = ({ filteredList }) => {
	const { files } = useContext(FilesContext);
	const { isLoading, isRefetching, isError, error } = useFetchFiles();

	// When searching
	if (filteredList.isSearching) {
		if (filteredList.files.length <= 0)
			return <h1 className="text-center mt-8 font-semibold">No files found with that name 🤔</h1>;

		return (
			<ul className="grid grid-cols-2 gap-2">
				{filteredList.files.map((file: File) => {
					return <FileButton key={file.id} file={file} />;
				})}
			</ul>
		);
	}

	console.log(
		isLoading
			? "loading files"
			: isRefetching
			? "refetching files"
			: isError
			? `files error: ${error?.message}`
			: ""
	);

	return (
		<ul className="grid grid-cols-2 gap-2">
			{files.map((file: File) => {
				return <FileButton key={file.id} file={file} />;
			})}
		</ul>
	);
};

export default ListFiles;
