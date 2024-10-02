import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const PrivacyPolicy = () => {
	const location = useLocation();
	const cookiesRef = useRef<HTMLDivElement>(null);

	// Scroll to the cookies section if the user navigated from the GDPR popup
	useEffect(() => {
		if (location.hash === "#cookies") {
			cookiesRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [location.hash]);

	return (
		<div>
			<div className="mt-2">
				<h1 className="text-2xl font-medium">Privacy Policy</h1>
				<div className="mt-1 h-[2px] bg-primary" />
			</div>
			{/* Content */}
			<article className="prose prose-invert mt-2 prose-a:text-textAccent marker:text-accent">
				<strong>
					<i>Effective Date: September 10, 2024</i>
				</strong>

				<h3>1. Introduction</h3>
				<p>
					Muistio ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy
					explains how we collect, use, and protect your personal data.
				</p>

				<h3>2. Data We Collect</h3>
				<p>
					<strong>Account Information:</strong> When you create an account, we collect your email
					address and other account details. Refer to{" "}
					<Link
						to="https://firebase.google.com/support/privacy"
						target="_blank"
						rel="noopener noreferrer">
						Firebase's Privacy Policy
					</Link>{" "}
					for more information.
				</p>
				<p>
					<strong>File Data:</strong> We store the text files you create and their metadata.The
					content of your files is encrypted and not accessible to us.
				</p>
				<p>
					<strong>Encryption Key:</strong> We store your encryption key in IndexedDB during your
					session, but it is encrypted and not accessible to us.
				</p>

				<h3>3. How We Use Your Data</h3>
				<p>
					<strong>To Provide Services:</strong> We use your data to operate and improve our
					services.
				</p>
				<p>
					<strong>To Communicate:</strong> We may use your contact information to send you updates
					or respond to your inquiries.
				</p>

				<h3 id="cookies" ref={cookiesRef}>
					4. Cookies
				</h3>
				<p>
					<strong>What are cookies?</strong> Cookies are small text files placed on your device by a
					website. They are used by websites to remember your preferences, improve your browsing
					experience, and collect data for analytics.
				</p>
				<p>
					<strong>Our Use of Cookies:</strong> We use a single cookie to remember your consent to
					our GDPR notice, ensuring that you don't have to agree again during future visits. This
					cookie is only used to store your consent and does not track any other information about
					you. The cookie is set to expire after 365 days.
				</p>
				<p>
					<strong>Cookies Used by Third-Party Services:</strong> Our website uses third-party
					services for e.g. secure login functionality and website protection. These services may
					set cookies to provide their functionalities. These services include:
				</p>
				<ul>
					<li>
						<strong>Cloudflare:</strong> We use Cloudflare to enhance the performance and security
						of our website. Cloudflare sets essential cookies to ensure the website functions
						correctly and to protect against security threats. For more information on Cloudflare's
						cookies, please refer to their{" "}
						<Link
							to="https://www.cloudflare.com/cookie-policy/"
							target="_blank"
							rel="noopener noreferrer">
							Cookie Policy
						</Link>
						.{" "}
					</li>
					<li>
						<strong>Firebase:</strong> Once you create an account and log in, we use Firebase to
						enhance our services. Firebase may set cookies related to user authentication,
						performance monitoring, and analytics. For detailed information on how Firebase uses
						cookies, please refer to their{" "}
						<Link
							to="https://firebase.google.com/docs/auth/admin/manage-cookies"
							target="_blank"
							rel="noopener noreferrer">
							Session Cookies page
						</Link>
						.
					</li>
				</ul>

				<p>
					<strong>Managing Cookies:</strong> Since cookies are set by third-party services, we do
					not have control over their use. You can manage or disable cookies through your browser
					settings. For guidance on how to do this, please refer to your browser's help section.
					Note that disabling cookies may affect the functionality of the third-party services on
					our site.
				</p>

				<p>
					By using our website, you consent to the use of cookies by these third-party services as
					described. For more information on the cookies and data collection practices of these
					services, please review their privacy and cookie policies.
				</p>

				<h3>5. Data Protection</h3>
				<p>
					We use encryption and other security measures to protect your data. However, no method of
					transmission over the internet is 100% secure. You are responsible for keeping your
					account and encryption key secure.
				</p>

				<h3>6. Data Retention</h3>
				<p>
					We retain your data as long as your account is active. You can request deletion of your
					account and associated data by contacting us or navigating to your account settings and
					using the delete account feature.
				</p>

				<h3>7. Your Rights</h3>
				<p>
					Under GDPR, you have the right to access, correct, delete, and restrict the processing of
					your personal data. To exercise these rights, please contact us at{" "}
					<a href="mailto:wilzzudev@gmail.com" className="text-textAccent">
						wilzzudev@gmail.com
					</a>
					.
				</p>

				<h3>8. Third Parties</h3>
				<p>
					<strong>Firebase:</strong> We use Firebase to store and manage your data. Firebase may use
					cookies and collect data to provide and improve their services. For more information on
					how Firebase handles data, please refer to their{" "}
					<Link
						to="https://firebase.google.com/support/privacy"
						target="_blank"
						rel="noopener noreferrer">
						Privacy Policy
					</Link>
					.
				</p>
				<p>
					<strong>Cloudflare:</strong> We use Cloudflare to enhance the performance and security of
					our website. Cloudflare may collect and process data related to website traffic, including
					IP addresses, for security and operational purposes. For more information on how
					Cloudflare handles data, please refer to their{" "}
					<Link
						to="https://www.cloudflare.com/privacypolicy/"
						target="_blank"
						rel="noopener noreferrer">
						Privacy Policy
					</Link>
					.
				</p>

				<h3>9. Changes to Privacy Policy</h3>
				<p>
					We may update this Privacy Policy from time to time. We will notify you of any significant
					changes. Your continued use of Muistio constitutes your acceptance of the new Privacy
					Policy.
				</p>

				<h3>10. Contact Us</h3>
				<p>
					If you have any questions about this Privacy Policy, please contact us at{" "}
					<a href="mailto:wilzzudev@gmail.com" className="text-textAccent">
						wilzzudev@gmail.com
					</a>
					.
				</p>
			</article>
		</div>
	);
};

export default PrivacyPolicy;
