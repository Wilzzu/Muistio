import Landing3Note from "../../assets/landing-page/Landing_3_Note.webp";

// Encrypted sample text
/* 
Dz+aC/R7l0TmopEj+LkhGNICbG3ZMMxstEdRLWe46Dbx6M0WHkD6FwR0gjRW7X4Stnr28m0MepJMm7WE7QPgNjdIz2DlRP2INdVqNtQDkkGmZp57Rqr9G7Z+dUJdb6x5x2fCL6XwbVLrWJwW9tq9FlQf2YphzWAVnZc0wUVuUHPXx+CPd0GhAC6OBzEB0lxtyKGrTX7AKTlG9mVHtM2ftvWXSTWwsc8wwQqku7k/MICfg8p6+HdYjdRE701/xk467cKyC7RWH7TIV0F4V0MkKrfA1f/w51xMv6dMJ/DSnRxdPxpgJ7SfmAyNC/pjrGWrKVP0wIO2X2Pspq4zUOQtk6wQEV1dmg==
*/

const SectionThree = () => {
	const S3Text = () => (
		<>
			<h1 className="text-[3.5rem] leading-[3.9rem] font-bold">
				Your Files,
				<br /> Your Key,
				<br />
				<span className="text-accent selection:text-black">Your Privacy</span>
			</h1>
			<p className="text-lg leading-[1.575rem]">
				Your privacy is non-negotiable. We encrypt your files with a{" "}
				<span className="text-[#21aeff] selection:text-black">key only you know</span>, that is
				never sent to us.
				<br />
				No one else — <b>not even us</b> — can access your files.
			</p>
		</>
	);

	const S3Image = () => (
		<>
			{/* Encryption text */}
			<div className="absolute h-auto w-[76%] z-0 bg-neutral-800">Encrypted text</div>
			{/* Note */}
			<img
				draggable={false}
				src={Landing3Note}
				className="absolute h-auto w-[60%] translate-y-36 object-contain z-[1]"
			/>
		</>
	);

	return { S3Text, S3Image };
};

export default SectionThree;
