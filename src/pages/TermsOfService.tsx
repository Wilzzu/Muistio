const TermsOfService = () => {
	return (
		<div>
			<div className="mt-2">
				<h1 className="text-2xl font-medium">Terms Of Service</h1>
				<div className="mt-1 h-[2px] bg-primary" />
			</div>
			{/* Content */}
			<article className="prose prose-invert mt-2">
				<strong>
					<i>Effective Date: September 10, 2024</i>
				</strong>
				<h3>1. Introduction</h3>
				<p>
					Welcome to Muistio! These Terms of Service ("Terms") govern your use of our website and
					services. By creating an account or using Muistio, you agree to these Terms. If you don't
					agree, please do not use our services.
				</p>
				<h3>2. Account Creation and Use</h3>
				<p>
					To use Muistio, you must create an account using your Google account. You are responsible
					for maintaining the confidentiality of your account information and for all activities
					that occur under your account.
				</p>
				<h3>3. User Content</h3>
				<p>
					You retain ownership of the content you create and store on Muistio. By using our
					services, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and
					process your content solely for the purpose of providing and improving our services.
				</p>
				<h3>4. Data Security</h3>
				<p>
					We use encryption and other security measures to protect your data. However, we cannot
					guarantee the absolute security of your data. You are responsible for keeping your
					encryption key secure.
				</p>
				<h3>5. Account Termination</h3>
				<p>
					You may terminate your account at any time. We may suspend or terminate your account if we
					believe you have violated these Terms.
				</p>
				<h3>6. Changes to Terms</h3>
				<p>
					We may update these Terms from time to time. We will notify you of any significant
					changes. Your continued use of Muistio after such changes constitutes your acceptance of
					the new Terms.
				</p>
				<h3>7. Limitation of Liability</h3>
				<p>
					To the fullest extent permitted by law, Muistio is not liable for any indirect,
					incidental, or consequential damages arising out of your use of our services.
				</p>
				<h3>8. Governing Law</h3>
				<p>
					These Terms are governed by the laws of Finland, and any disputes will be resolved in the
					courts of Finland.
				</p>
				<h3>9. Contact Us</h3>
				<p>
					If you have any questions about these Terms, please contact us at{" "}
					<a href="mailto:wilzzudev@gmail.com" className="text-textAccent">
						wilzzudev@gmail.com
					</a>
					.
				</p>
			</article>
		</div>
	);
};

export default TermsOfService;
