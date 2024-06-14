import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { IoIosArrowDown } from "react-icons/io";

type DropdownOption = {
	id: number;
	title: string;
};

type ButtonProps = {
	options: DropdownOption[];
	onClick: (selected: DropdownOption) => void;
	dropdownSide: "left" | "right";
	children: ReactNode;
};

const ButtonDropdown: FC<ButtonProps> = ({ options, onClick, dropdownSide, children }) => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Set selected ID and close the dropdown
	const handleDropdownClick = (selected: DropdownOption) => {
		setOpen(false);
		onClick(selected);
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
			{/* Border for button */}
			<div
				ref={buttonRef}
				className="p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200">
				{/* Main button */}
				<button
					onClick={() => setOpen((prev) => !prev)}
					className="flex items-center justify-center h-9 group">
					<span className="flex items-center justify-center gap-[6px] px-2 h-full rounded-l-lg bg-gradient-radial from-transparent bg-primary to-primary/60 group-hover:bg-primary/50 text-sm font-semibold duration-200">
						{children}
					</span>
					<span className="h-full flex items-center justify-center px-[6px] bg-primary group-hover:bg-primary/70 border-l border-primaryHighlight/40 rounded-r-lg duration-200">
						<IoIosArrowDown className="opacity-80" />
					</span>
				</button>
			</div>
			{open && (
				// Dropdown container / border
				<div
					ref={dropdownRef}
					className={cn(
						"absolute top-10 p-[1px] min-w-full bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
						dropdownSide === "left" ? "left-0" : "right-0"
					)}>
					{/* Dropdown buttons */}
					<ul
						className={cn(
							"p-1 rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-semibold"
						)}>
						{options.map((e, i) => {
							return (
								<li key={i}>
									<button
										className="text-nowrap py-2 px-4 w-full text-left bg-gradient-to-br from-transparent to-transparent hover:from-primaryHighlight/90 hover:to-primaryHighlight/20 rounded-md"
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

export default ButtonDropdown;
