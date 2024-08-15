import { Link } from "react-router-dom";

const LandingNavbar = () => {
	return (
		<nav className="w-[1200px] flex justify-between items-center h-16">
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
