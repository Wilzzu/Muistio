import { useContext, useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import AuthContext from "../../context/AuthContext";
import usePasswordStrength from "../../hooks/usePasswordStrength";
import PasswordStrengthBar from "./PasswordStrengthBar";
import useLogOut from "../../hooks/useLogOut";
import useUpdateMetadata from "../../hooks/useUpdateMetadata";
import { EncryptionData } from "../../types/types";
import useIndexedDB from "../../hooks/useIndexedDB";
import { encodeBase64, encrypt, generateRandomBytes } from "../../lib/encryption";
import { PiWarningDuotone } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi";

type InvalidFieldType = {
	key: boolean;
	confirm: boolean;
	reason: string;
};

const defaultInvalidFields = {
	key: false,
	confirm: false,
	reason: "Too weak",
};

const CreateEncryptionKey = () => {
	const [encryptionKey, setEncryptionKey] = useState("");
	const [encryptionKeyConfirm, setEncryptionKeyConfirm] = useState("");
	const [showKey, setShowKey] = useState(false);
	const [showKeyConfirm, setShowKeyConfirm] = useState(false);
	const [invalidFields, setInvalidFields] = useState<InvalidFieldType>(defaultInvalidFields);
	const { setEncryptionKeyChallenge, setEncryptionKeySet } = useContext(AuthContext);
	const { handleLogOut } = useLogOut();
	const passwordStrength = usePasswordStrength(encryptionKey);
	const { updateMetadataMutation, isUpdating } = useUpdateMetadata(
		"Encryption Key",
		onUpdateSuccess
	);
	const { storeEncryptionKey } = useIndexedDB();

	async function onUpdateSuccess(updatedObject: EncryptionData) {
		// Save the key to indexedDB
		const key = await storeEncryptionKey(encryptionKey);
		if (!key)
			return setInvalidFields({
				key: true,
				confirm: false,
				reason: "Failed to store the key in IndexedDB",
			});
		setEncryptionKeySet(true);

		// Set the encryption key challenge
		setEncryptionKeyChallenge(updatedObject);
	}

	const addEncryptionKey = () => {
		// Create the encryption key challenge
		const challenge = encrypt(encodeBase64(generateRandomBytes(16)), encryptionKey);

		// Update encryption key challenge and track state
		updateMetadataMutation(challenge);
	};

	const validateFieldsAndStrength = () => {
		// Check for invalid fields
		const defaultClone = structuredClone(defaultInvalidFields);
		if (passwordStrength <= 1)
			return setInvalidFields({ key: true, confirm: false, reason: "Too weak" });

		if (!encryptionKeyConfirm.trim())
			return setInvalidFields({ ...defaultClone, confirm: true, reason: "Confirm key" });

		if (encryptionKey !== encryptionKeyConfirm)
			return setInvalidFields({ key: false, confirm: true, reason: "Keys do not match" });

		// Create challenge and update key
		addEncryptionKey();
	};

	const clearInvalidField = (field: string) => {
		if (!invalidFields.key && !invalidFields.confirm) return;
		setInvalidFields((prev) => ({ ...prev, [field]: false }));
	};

	return (
		<Modal closeModalFunction={() => false}>
			<section className="flex flex-col gap-5">
				{/* Title and Description */}
				<div>
					<h1 className="font-bold text-2xl mb-4">
						<HiOutlineKey className="inline-block mb-1" /> Create an Encryption Key
					</h1>
					<p>
						To secure your files, you need to create an encryption key. This key is used to encrypt
						and decrypt your files. The key is never sent to our servers, only you know it.
					</p>
					<p className="text-warning font-medium">
						<PiWarningDuotone className="inline-block text-xl" /> If you lose the key, you lose
						access to <b>ALL</b> your files. We cannot recover them for you.
					</p>
				</div>

				{/* Inputs */}
				<div className="flex flex-col gap-1">
					<label htmlFor="muistioEncryptionKey" className="font-medium">
						New encryption key{" "}
						<span className="text-warning ml-2">{invalidFields.key && invalidFields.reason}</span>
					</label>
					<TextInput
						type={showKey ? "text" : "password"}
						id="muistioEncryptionKey"
						warning={invalidFields.key}
						onChange={setEncryptionKey}
						onClick={() => clearInvalidField("key")}
						disableAutoComplete
						disabled={isUpdating}
						style={{ main: "bg-opacity-90" }}>
						<button
							onClick={() => setShowKey((prev) => !prev)}
							disabled={isUpdating}
							className="absolute right-1 p-2 rounded-lg hover:bg-secondary/80 disabled:hover:bg-transparent duration-100">
							{showKey ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</TextInput>
					<PasswordStrengthBar strength={passwordStrength} />

					<label htmlFor="muistioEncryptionKeyConfirm" className="font-medium">
						Confirm encryption key{" "}
						<span className="text-warning ml-2">
							{invalidFields.confirm && invalidFields.reason}
						</span>
					</label>
					<TextInput
						type={showKeyConfirm ? "text" : "password"}
						id="muistioEncryptionKeyConfirm"
						warning={invalidFields.confirm}
						onChange={setEncryptionKeyConfirm}
						onClick={() => clearInvalidField("confirm")}
						disableAutoComplete
						disabled={isUpdating}
						style={{ main: "bg-opacity-90" }}>
						<button
							onClick={() => setShowKeyConfirm((prev) => !prev)}
							disabled={isUpdating}
							className="absolute right-1 p-2 rounded-lg hover:bg-secondary/80 disabled:hover:bg-transparent duration-100">
							{showKeyConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</TextInput>
				</div>

				{/* Buttons */}
				<div className="flex flex-col gap-1">
					<Button
						onClick={validateFieldsAndStrength}
						highlight
						disabled={isUpdating}
						style={{ main: "bg-opacity-80 py-3 w-full", border: "w-full mt-3" }}>
						Create encryption key
					</Button>
					<button
						onClick={handleLogOut}
						disabled={isUpdating}
						className="text-sm w-fit underline underline-offset-2 opacity-80 hover:opacity-100 disabled:opacity-50 duration-100">
						Log out
					</button>
				</div>
			</section>
		</Modal>
	);
};

export default CreateEncryptionKey;
