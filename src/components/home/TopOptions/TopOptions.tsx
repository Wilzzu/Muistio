/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../common/Button";
import { LuPlus } from "react-icons/lu";
import { MdSort } from "react-icons/md";
import ButtonDropdown from "../../common/ButtonDropdown";
import { useContext } from "react";
import FilesContext from "../../../context/FilesContext";
import { useNavigate } from "react-router-dom";

const sortOptions = [
	{ id: 1, title: "Most Recent" },
	{ id: 2, title: "Oldest" },
	{ id: 3, title: "Name A-Z" },
	{ id: 4, title: "Name Z-A" },
	{ id: 5, title: "Smallest Size" },
	{ id: 6, title: "Largest Size" },
];

const TopOptions = () => {
	const { files, selectedSort, setSelectedSort } = useContext(FilesContext);
	const navigate = useNavigate();

	return (
		<>
			<ul className="w-full flex justify-between z-[2]">
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
						{sortOptions.find((e) => e.id === selectedSort)?.title || "Most Recent"}
					</ButtonDropdown>
				</li>
			</ul>
		</>
	);
};

export default TopOptions;
