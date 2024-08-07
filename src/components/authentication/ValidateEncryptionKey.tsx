import { KeyboardEvent, useContext, useState } from "react";
import TextInput from "../common/TextInput";
import Modal from "../common/Modal";
import Button from "../common/Button";
import useLogOut from "../../hooks/useLogOut";
import AuthContext from "../../context/AuthContext";
import { decrypt } from "../../lib/encryption";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import useIndexedDB from "../../hooks/useIndexedDB";
import { HiOutlineKey } from "react-icons/hi";

const ValidateEncryptionKey = () => {
	const [encryptionKey, setEncryptionKey] = useState("");
	const [showKey, setShowKey] = useState(false);
	const [invalidField, setInvalidField] = useState({ invalid: false, message: "" });
	const [isValidating, setIsValidating] = useState(false);
	const { handleLogOut } = useLogOut();
	const { encryptionKeyChallenge, setEncryptionKeySet } = useContext(AuthContext);
	const { storeEncryptionKey } = useIndexedDB();

	const validate = () => {
		if (isValidating) return;
		setIsValidating(true);

		// Add a delay so users can't easily spam different keys
		if (encryptionKeyChallenge === null) {
			return setTimeout(() => {
				setInvalidField({ invalid: true, message: "No encryption key challenge found." });
				setIsValidating(false);
			}, 1000);
		}

		const decryptedChallenge = decrypt(
			encryptionKeyChallenge.ciphertext,
			encryptionKey,
			encryptionKeyChallenge.salt,
			encryptionKeyChallenge.nonce
		);

		if (decryptedChallenge === "invalid") {
			return setTimeout(() => {
				setIsValidating(false);
				setInvalidField({ invalid: true, message: "Invalid encryption key." });
			}, 1000);
		}

		return setTimeout(async () => {
			const key = await storeEncryptionKey(encryptionKey);
			if (!key) {
				setInvalidField({ invalid: true, message: "Failed to store the key in IndexedDB." });
				return setIsValidating(false);
			}

			setEncryptionKeySet(true);
			return setIsValidating(false);
		}, 300);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") validate();
		if (event.code === "Escape") event.currentTarget.blur();
	};

	return (
		<Modal closeModalFunction={() => false}>
			<section className="flex flex-col gap-2">
				{/* Title and Description */}
				<div>
					<h1 className="font-bold text-2xl mb-4">
						<HiOutlineKey className="inline-block mb-1" /> Verify your Encryption Key
					</h1>
					<p>
						Enter your encryption key to access your files. The key is never sent to our servers.
						Decrypting your files is done locally on your device with the key you provide.
					</p>
				</div>

				{/* Inputs */}
				<div className="flex flex-col gap-1">
					<p className="text-warning font-medium h-6">
						{invalidField.invalid && invalidField.message}
					</p>
					<label htmlFor="muistioEncryptionKey" className="sr-only">
						Enter Encryption key
					</label>
					<TextInput
						type={showKey ? "text" : "password"}
						id="muistioEncryptionKey"
						warning={invalidField.invalid}
						onChange={setEncryptionKey}
						onClick={() => setInvalidField({ invalid: false, message: "" })}
						disableAutoComplete
						placeholder="Enter encryption key..."
						disabled={isValidating}
						onKeyDown={onKeyDown}
						style={{ main: "bg-opacity-90" }}>
						<button
							onClick={() => setShowKey((prev) => !prev)}
							disabled={isValidating}
							className="absolute right-1 p-2 rounded-lg hover:bg-secondary/80 disabled:hover:bg-transparent duration-100">
							{showKey ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</TextInput>
				</div>

				{/* Buttons */}
				<div className="flex flex-col gap-1">
					<Button
						onClick={validate}
						highlight
						disabled={isValidating}
						style={{ main: "bg-opacity-80 py-3 w-full", border: "w-full mt-3" }}>
						{isValidating ? (
							<ImSpinner2 className="ml-1 animate-spin inline-block h-5" />
						) : (
							"Verify encryption key"
						)}
					</Button>
					<button
						onClick={handleLogOut}
						disabled={isValidating}
						className="text-sm w-fit underline underline-offset-2 opacity-80 hover:opacity-100 disabled:opacity-50 duration-100">
						Log out
					</button>
				</div>
			</section>
		</Modal>
	);
};

export default ValidateEncryptionKey;
