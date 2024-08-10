import Button from "../../common/Button";
import { LuPlus } from "react-icons/lu";
import { MdSort } from "react-icons/md";
import ButtonDropdown from "../../common/ButtonDropdown";
import { useContext, useState } from "react";
import FilesContext from "../../../context/FilesContext";
import { useNavigate } from "react-router-dom";

type SortOption = {
	id: number;
	title: string;
};

const sortOptions = [
	{ id: 1, title: "Most Recent" },
	{ id: 2, title: "Oldest" },
	{ id: 3, title: "Largest Size" },
	{ id: 4, title: "Smallest Size" },
];

const TopOptions = () => {
	const { files } = useContext(FilesContext);
	const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
	const navigate = useNavigate();

	return (
		<>
			<ul className="w-full flex justify-between z-10">
				{/* New File button */}
				<li>
					<Button onClick={() => navigate("?modal=new")} highlight={files?.length === 0}>
						<LuPlus />
						New File
					</Button>
				</li>
				{/* Sort button */}
				<li>
					<ButtonDropdown options={sortOptions} onClick={setSelectedSort} dropdownSide="right">
						<MdSort className="text-lg" />
						{selectedSort.title}
					</ButtonDropdown>
				</li>
			</ul>
		</>
	);
};

export default TopOptions;
