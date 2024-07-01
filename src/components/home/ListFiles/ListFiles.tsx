import { FC } from "react";
import { File } from "../../../types/types";
import FileButton from "./FileButton";

type ListFilesProps = {
	files: File[];
};

const ListFiles: FC<ListFilesProps> = ({ files }) => {
	return (
		<ul className="grid grid-cols-2 gap-2">
			{files.map((e: File) => {
				return <FileButton key={e.id} file={e} />;
			})}
		</ul>
	);
};

export default ListFiles;
