import { FC, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { BsThreeDots } from "react-icons/bs";

type DropdownOption = {
	title: string;
	action: () => void;
	warning?: boolean;
};

type ButtonProps = {
	options: DropdownOption[];
	dropdownSide: "left" | "right";
};

const ButtonMoreOptions: FC<ButtonProps> = ({ options, dropdownSide }) => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Set selected ID and close the dropdown
	const handleDropdownClick = (selected: DropdownOption) => {
		setOpen(false);
		selected.action();
	};

	// Close dropdown when clicked outside
	const handleClickOutside = (e: MouseEvent | TouchEvent) => {
		if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return; // Ignore main button
		if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleClickOutside);
		document.addEventListener("touchend", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
			document.removeEventListener("touchend", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative">
			{/* Main button */}
			<button
				ref={buttonRef}
				onClick={() => setOpen((prev) => !prev)}
				className="px-2 py-1 rounded-xl hover:bg-primary/60 duration-200 text-lg">
				<BsThreeDots />
			</button>
			{open && (
				// Dropdown container / border
				<div
					ref={dropdownRef}
					className={cn(
						"absolute top-6 p-[1px] min-w-full bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200 z-10",
						dropdownSide === "left" ? "left-0" : "right-0"
					)}>
					{/* Dropdown buttons */}
					<ul
						className={cn(
							"p-1 rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-semibold"
						)}>
						{options.map((e, i) => {
							return (
								<li key={i}>
									<button
										className={cn(
											"text-nowrap py-2 px-2 pr-8 w-full text-left bg-gradient-to-br from-transparent to-transparent hover:from-primaryHighlight/70 hover:to-primaryHighlight/10 rounded-md",
											e.warning &&
												"text-red-400 hover:from-red-700/50 hover:to-red-900/50 hover:text-red-400"
										)}
										onClick={() => handleDropdownClick(e)}>
										{e.title}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ButtonMoreOptions;
