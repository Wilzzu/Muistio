import { FC, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { BsThreeDots } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";

type DropdownOption = {
	title: string;
	action: () => void;
	warning?: boolean;
};

type ButtonProps = {
	options: DropdownOption[];
	dropdownSide: "left" | "right";
	disabled?: boolean;
};

const ButtonMoreOptions: FC<ButtonProps> = ({ options, dropdownSide, disabled }) => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	useClickOutside(buttonRef, () => setOpen(false), dropdownRef);

	// Set selected ID and close the dropdown
	const handleDropdownClick = (selected: DropdownOption) => {
		setOpen(false);
		selected.action();
	};

	return (
		<div className="relative">
			{/* Main button */}
			<button
				ref={buttonRef}
				onClick={() => setOpen((prev) => !prev)}
				disabled={disabled}
				className="px-2 py-1 rounded-xl hover:bg-primary/60 disabled:hover:bg-transparent duration-200 text-lg">
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
												"text-red-400 hover:from-red-600/80 hover:to-red-900/50 hover:text-red-100 duration-100"
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
