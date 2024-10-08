import { Link } from "react-router-dom";
import ButtonTexture from "../../assets/landing-page/Landing_Button_Texture.webp";
import { motion } from "framer-motion";

const ButtonVariants = {
	hidden: {
		y: -20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1.7,
			ease: [0.18, 0.1, 0.25, 1],
			delay: 1.5,
			opacity: { duration: 1.5, ease: "easeInOut", delay: 1.5 },
		},
	},
};

const CTAButton = () => {
	return (
		<Link to="/home" className="w-fit">
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={ButtonVariants}
				viewport={{ once: true }}>
				<div className="group w-fit p-[1px] bg-gradient-radial from-transparent bg-accent/20 hover:bg-accent/50 from-20% to-accent rounded-[9px] shadow-accent/20 hover:shadow-accent/50 shadow-centered hover:scale-[1.06] duration-300 overflow-hidden">
					<div className="relative overflow-hidden h-full flex items-center justify-center gap-2 px-10 sm:px-6 py-4 sm:py-3 rounded-lg bg-primary bg-opacity-80 group-hover:bg-opacity-60 text-lg font-semibold duration-300 shadow-black/50 drop-shadow-highlight">
						Launch Muistio
						<img
							src={ButtonTexture}
							alt="Launch Muistio"
							className="absolute bottom-0 right-0 object-cover animate-button-texture group-hover:animate-button-texture-fast opacity-20 group-hover:opacity-80 duration-300"
						/>
						<img
							src={ButtonTexture}
							alt="Launch Muistio"
							className="absolute bottom-0 right-0 object-cover animate-button-texture-start-middle group-hover:animate-button-texture-fast-start-middle opacity-20 group-hover:opacity-80 duration-300"
						/>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default CTAButton;
