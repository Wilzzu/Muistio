import { cubicBezier, motion } from "framer-motion";
import { FC } from "react";

const NoFilesArrow: FC<{ style?: string }> = ({ style }) => {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width="229.553"
			height="121.012"
			viewBox="0 0 229.553 121.012"
			className={style}>
			<g transform="translate(-331.603 -436.66)">
				<motion.path
					d="M342.023,457.3,332.3,454,351.47,437.36l6.238,25.224L347.156,459"
					fill="none"
					stroke="#fff"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.4"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{
						duration: 1.8,
						delay: 2,
						ease: cubicBezier(0.41, 0.41, 0.07, 1),
					}}
				/>
				<motion.path
					d="M560.376,553.5s-267.427,32.61-212.959-102.6"
					fill="none"
					stroke="#fff"
					strokeLinecap="round"
					strokeWidth="1.4"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
				/>
			</g>
		</motion.svg>
	);
};

export default NoFilesArrow;
