/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Dispatch,
	FC,
	HTMLInputTypeAttribute,
	KeyboardEvent,
	ReactNode,
	SetStateAction,
} from "react";
import { cn } from "../../lib/utils";

type CustomTextInputStyles = {
	border?: string;
	main?: string;
};

type TextInputProps = {
	type: HTMLInputTypeAttribute;
	onChange: Dispatch<SetStateAction<string>>;
	id: string;
	placeholder?: string;
	highlight?: boolean;
	warning?: boolean;
	style?: CustomTextInputStyles;
	override?: boolean;
	disabled?: boolean;
	disableAutoComplete?: boolean;
	onClick?: () => void;
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	children?: ReactNode;
};

const defaultTextInputStyles = {
	border:
		"relative flex items-center p-[1px] bg-gradient-to-br from-primaryHighlight via-primaryHighlight/50 to-primaryHighlight rounded-[9px] duration-200",
	main: "w-full h-full outline-none py-2 px-4 rounded-lg bg-gradient-radial from-transparent bg-primary to-primary/80 hover:bg-primary/80 duration-200 text-sm font-semibold disabled:opacity-50 disabled:pointer-events-none",
};

const TextInput: FC<TextInputProps> = ({
	type,
	onChange,
	id,
	placeholder,
	highlight,
	warning,
	style,
	override,
	disabled,
	disableAutoComplete,
	onClick,
	onKeyDown,
	children,
}) => {
	return (
		// Border container
		<div
			className={
				override
					? style?.border
					: cn(
							defaultTextInputStyles.border,
							{
								"from-accent via-accent/20 to-accent": highlight,
							},
							{
								"from-red-600 via-red-600/20 to-red-600": warning,
							},
							{
								"opacity-50 disabled:pointer-events-none": disabled,
							},
							style?.border
					  )
			}>
			{/* Main input */}
			<input
				type={type}
				name={id}
				id={id}
				disabled={disabled}
				className={override ? style?.main : cn(defaultTextInputStyles.main, style?.main)}
				placeholder={placeholder}
				autoComplete={disableAutoComplete ? "off" : "on"}
				onChange={(e) => onChange(e.target.value)}
				onClick={onClick}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown && onKeyDown(e)}
			/>
			{children}
		</div>
	);
};

export default TextInput;
