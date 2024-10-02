import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo_Small.webp";

const Footer = () => {
	return (
		<>
			{/* Desktop */}
			<footer className="hidden sm:block absolute bottom-0 right-1">
				<Link
					to="https://github.com/Wilzzu"
					target="_blank"
					rel="noopener noreferrer"
					className="text-white/50 hover:text-white text-xs duration-300">
					© 2024 Wilzzu. All rights reserved.
				</Link>
			</footer>
			{/* Mobile */}
			<footer className="sm:hidden flex justify-between items-end w-full py-4 mt-8 px-3 text-xs">
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<img src={Logo} alt="Muistio Logo" className="h-5 w-auto" />
						<p className="font-bold text-base">Muistio</p>
					</div>
					<Link to="https://github.com/Wilzzu" target="_blank" rel="noopener noreferrer">
						© 2024 Wilzzu. All rights reserved.
					</Link>
				</div>
				<div className="font-semibold flex flex-col gap-1">
					<Link to="/terms-of-service">Terms of Service</Link>
					<Link to="/privacy-policy">Privacy Policy</Link>
				</div>
			</footer>
		</>
	);
};

export default Footer;
