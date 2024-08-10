import { FC, useContext } from "react";
import FileButton from "./FileButton";
import FilesContext from "../../../context/FilesContext";
import { File, FilteredList } from "../../../types/types";
import useFetchFiles from "../../../hooks/useFetchFiles";
import { Timestamp } from "firebase/firestore";
import { IoIosSad } from "react-icons/io";

type ListFilesProps = {
	filteredList: FilteredList;
};

const ListFiles: FC<ListFilesProps> = ({ filteredList }) => {
	const { files } = useContext(FilesContext);
	const { isLoading, isError, error } = useFetchFiles();

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

	// Loading states
	if (isLoading) {
		return (
			<>
				{[...Array(8).keys()].map((_, i) => (
					<FileButton
						key={i}
						file={{
							id: i.toString(),
							dateModified: Timestamp.now(),
							size: 1234567,
							title: "Loading file... ....",
						}}
						showSkeleton
					/>
				))}
			</>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col py-10 gap-1 items-center justify-center col-span-2">
				<IoIosSad className="text-[40px] text-warning" />
				<div className="text-center">
					<h1 className="text-warning text-lg">Error fetching files</h1>
					<p className="text-sm opacity-80">{error?.message}</p>
				</div>
			</div>
		);
	}
	return (
		<>
			{files.map((file: File) => {
				return <FileButton key={file.id} file={file} />;
			})}
		</>
	);
};

export default ListFiles;
