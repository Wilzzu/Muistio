import { FC, useContext } from "react";
import FileButton from "./FileButton";
import FilesContext from "../../../context/FilesContext";
import { File, FilteredList } from "../../../types/types";
import useFetchFiles from "../../../hooks/useFetchFiles";
import { Timestamp } from "firebase/firestore";
import { IoIosSad } from "react-icons/io";
import NoFilesArrow from "../../../assets/NoFilesArrow";

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

	if (files?.length <= 0) {
		return (
			<div className="relative flex flex-col py-10 gap-1 items-center justify-center col-span-2">
				<NoFilesArrow style="absolute left-10 top-2" />
				<IoIosSad className="text-[40px] opacity-95" />
				<div className="relative text-center">
					<div className="absolute -left-4 w-[150%] h-full bg-background z-0" />
					<p className="text-lg opacity-95">No files found</p>
					<p className="text-sm opacity-80">Create a file to get started</p>
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
