import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { CiCloudOn } from "react-icons/ci";
import { motion } from "framer-motion";

const parseStorageSize = (size: number) => {
	if (size < 1000) return `${size} B`;
	return `${Math.floor(size / 1000)} KB`;
};

const StorageIndicator = () => {
	const { storageSize } = useContext(AuthContext);
	const storageUsed = (storageSize / 1_000_000) * 100;

	return (
		<li>
			<div className="w-full flex flex-col justify-center gap-1 px-3 pt-2 pb-1 mb-1 rounded-md text-xs font-normal">
				<p className="flex items-center gap-1">
					<CiCloudOn className="inline-block text-lg stroke-1" /> Storage
					<span className="text-[0.67rem]">
						({storageUsed >= 1 ? Math.floor(storageUsed) : storageUsed.toFixed(2)}%)
					</span>
				</p>
				{/* Percentage bar */}
				<div className="relative bg-primaryHighlight w-full h-1 rounded-full overflow-hidden">
					<motion.div
						initial={{ transform: "translateX(-100%)", backgroundColor: "#0793e3" }}
						animate={{
							transform: `translateX(-${100 - storageUsed}%)`,
							backgroundColor:
								storageUsed >= 90 ? "#fc605d" : storageUsed >= 70 ? "#f59e0b" : "#0793e3",
						}}
						transition={{ type: "spring", stiffness: 80, damping: 20 }}
						className="absolute bg-accent inset-0 rounded-full w-full"
					/>
				</div>
				<p
					title="Encrypted storage size on the server, will be higher than the decrypted file size you see in the app"
					className="text-[0.6rem] font-thin">{`${parseStorageSize(storageSize)} / 1,000 KB`}</p>
			</div>
		</li>
	);
};

export default StorageIndicator;
