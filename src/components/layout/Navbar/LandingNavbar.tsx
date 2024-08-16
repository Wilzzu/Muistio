import { Link } from "react-router-dom";

const LandingNavbar = () => {
	return (
		<nav className="max-w-[1200px] w-full flex justify-between items-center h-24 shrink-0">
			<ul className="flex items-center gap-8">
				<li>
					<Link to="/">
						<img src="logo" alt="logo" className="h-10" />
					</Link>
				</li>
				<li>
					<Link to="/faq">Frequently Asked Questions</Link>
				</li>
				<li>
					<Link to="/contact">Contact Us</Link>
				</li>
			</ul>
			<Link to="/home">Login</Link>
		</nav>
	);
};

export default LandingNavbar;
