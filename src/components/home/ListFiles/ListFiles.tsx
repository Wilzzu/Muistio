import { FC } from "react";
import { File } from "../../../types/types";
import { LuCalendar } from "react-icons/lu";
import { PiFileText } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";

type ListFilesProps = {
	files: File[];
};

const ListFiles: FC<ListFilesProps> = ({ files }) => {
	return (
		<ul className="grid grid-cols-2 gap-2">
			{files.map((e: File) => {
				return (
					// Button container / border
					<li className="relative h-20 p-[1px] bg-gradient-to-br from-[#61718f] via-primaryHighlight to-[#61718f] rounded-[13px] duration-200">
						{/* File information */}
						<button className="h-full w-full flex flex-col p-4 bg-gradient-radial from-transparent to-primaryHighlight/50 bg-[#364149] hover:bg-[#515e72] rounded-xl duration-200">
							<h1 className="w-full truncate text-left text-lg font-medium">{e.title}</h1>
							<p className="flex gap-2 text-xs">
								<span>
									<LuCalendar className="inline-block mb-[0.1rem]" />{" "}
									{e.dateModified.toDateString()}
								</span>
								<span>
									<PiFileText className="inline-block text-sm mb-[0.1rem]" /> {e.size + "KB"}
								</span>
							</p>
						</button>

						{/* Multiselect button */}
						<button className="absolute top-1 right-1 px-2 py-1 rounded-xl hover:bg-primary/60 duration-200 text-lg">
							<BsThreeDots />
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default ListFiles;
