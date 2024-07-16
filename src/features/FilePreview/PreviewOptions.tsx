import Button from "../../components/common/Button";
import { MdEdit } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

const PreviewOptions = () => {
	return (
		<div className="absolute -right-4 -top-4 p-8 flex gap-2 opacity-70 hover:opacity-100 duration-150">
			<Button style={{ main: "p-2 text-base" }}>
				<MdEdit />
			</Button>
			<Button style={{ main: "p-2 text-base" }}>
				<FiDownload className="text-white" />
			</Button>
			<Button warning style={{ main: "p-2 text-base" }}>
				<LuTrash2 />
			</Button>
		</div>
	);
};

export default PreviewOptions;
