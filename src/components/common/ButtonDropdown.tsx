import { FC, ReactNode, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";

type DropdownOption = {
	id: number;
	title: string;
	warning?: boolean;
};

type ButtonProps = {
	options: DropdownOption[];
	onClick: (selected: number) => void;
	dropdownSide: "left" | "right";
	disabled?: boolean;
	customElement?: ReactNode;
	children: ReactNode;
};

const ButtonDropdown: FC<ButtonProps> = ({
	options,
	onClick,
	dropdownSide,
	disabled,
	customElement,
	children,
}) => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	useClickOutside(buttonRef, () => setOpen(false), dropdownRef);

	// Set selected ID and close the dropdown
	const handleDropdownClick = (selectedId: number) => {
		setOpen(false);
		onClick(selectedId);
	};

	return (
		<div className={cn("relative z-10", { "opacity-50": disabled })}>
			{/* Border for button */}
			<div
				ref={buttonRef}
				className="p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[7px] sm:rounded-[9px] duration-200">
				{/* Main button */}
				<button
					onClick={() => setOpen((prev) => !prev)}
					disabled={disabled}
					className="flex items-center justify-center h-8 sm:h-9 group">
					<span className="p-2 sm:p-[0.4rem] flex items-center justify-center gap-[6px] px-2 h-full rounded-l-md sm:rounded-l-lg bg-gradient-radial from-transparent bg-primary to-primary/60 group-hover:bg-primary/50 text-xs sm:text-sm font-semibold duration-200">
						{children}
					</span>
					<span className="h-full flex items-center justify-center px-[6px] bg-primary group-hover:bg-primary/70 border-l border-primaryHighlight/40 rounded-r-md sm:rounded-r-lg duration-200">
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
					{/* Dropdown Content */}
					<ul className="p-1 rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-semibold">
						{/* Custom content */}
						{customElement}
						{/* Option buttons */}
						{options.map((e, i) => {
							return (
								<li key={i}>
									<button
										className={cn(
											"text-nowrap py-2 pl-3 pr-6 w-full text-left bg-gradient-to-br from-transparent to-transparent hover:from-primaryHighlight/90 hover:to-primaryHighlight/20 rounded-md",
											{
												"text-red-400 hover:from-red-600/80 hover:to-red-900/50 hover:text-red-100 duration-100":
													e?.warning,
											}
										)}
										disabled={disabled}
										onClick={() => handleDropdownClick(e.id)}>
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
