import { encode, decode } from "base-64";
import { deriveKey as stableDeriveKey } from "@stablelib/pbkdf2";
import { SHA256 } from "@stablelib/sha256";
import { ChaCha20Poly1305 } from "@stablelib/chacha20poly1305";

// Derive key from passphrase and salt using PBKDF2
const deriveKey = (passphrase: string, salt: Uint8Array): Uint8Array => {
	const passwordBytes = new TextEncoder().encode(passphrase);
	return stableDeriveKey(SHA256, passwordBytes, salt, 100000, 32);
};

export const encodeBase64 = (data: Uint8Array): string => {
	return encode(String.fromCharCode(...data));
};

export const generateRandomBytes = (size: number): Uint8Array => {
	const bytes = new Uint8Array(size);
	window.crypto.getRandomValues(bytes);
	return bytes;
};

// Decode Base64 string to Uint8Array
const decodeBase64 = (base64String: string): Uint8Array => {
	const binaryString = decode(base64String);
	const length = binaryString.length;
	const bytes = new Uint8Array(length);
	for (let i = 0; i < length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes;
};

export const encrypt = (
	plaintext: string,
	passphrase: string
): { ciphertext: string; salt: string; nonce: string } => {
	// Generate random salt and nonce, derive key
	const salt = generateRandomBytes(16);
	const nonce = generateRandomBytes(12);
	const key = deriveKey(passphrase, salt);

	// Encrypt the plaintext
	const chacha = new ChaCha20Poly1305(key);
	const plaintextBytes = new TextEncoder().encode(plaintext);
	const sealed = chacha.seal(nonce, plaintextBytes);

	// Return the encrypted data as Base64 strings
	return {
		ciphertext: encodeBase64(sealed),
		salt: encodeBase64(salt),
		nonce: encodeBase64(nonce),
	};
};

export const decrypt = (
	ciphertext: string,
	passphrase: string,
	salt: string,
	nonce: string
): string => {
	try {
		// Derive key and initialize chacha
		const key = deriveKey(passphrase, decodeBase64(salt));
		const chacha = new ChaCha20Poly1305(key);

		// Decode Base64 strings
		const sealed = decodeBase64(ciphertext);
		const nonceBytes = decodeBase64(nonce);

		// Decrypt the data
		const plaintext = chacha.open(nonceBytes, sealed);
		if (!plaintext) throw new Error("Decryption failed");

		// Return the decrypted plaintext
		return new TextDecoder().decode(plaintext);
	} catch (error) {
		console.error("Failed to decrypt the data:", error);
		return "invalid";
	}
};
