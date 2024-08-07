import { decrypt, encodeBase64, encrypt, generateRandomBytes } from "../lib/encryption";

type StoredEncryptionKey = {
	ciphertext: string;
	salt: string;
	nonce: string;
	key: string;
};

const useIndexedDB = () => {
	const openDB = (): Promise<IDBDatabase> => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("MuistioDB", 1);

			request.onupgradeneeded = (event) => {
				const target = event.target as IDBOpenDBRequest | null;
				if (target) target.result.createObjectStore("encryptionKeys", { keyPath: "id" });
				else reject(new Error("Failed to upgrade database schema."));
			};

			request.onsuccess = (event) => {
				const target = event.target as IDBOpenDBRequest | null;
				if (target) resolve(target.result);
				else reject(new Error("Failed to open database."));
			};

			request.onerror = (event) => {
				const target = event.target as IDBOpenDBRequest | null;
				reject(target?.error || new Error("Database request error."));
			};
		});
	};

	const storeEncryptionKey = async (encryptionKey: string): Promise<boolean> => {
		try {
			const db = await openDB();
			const tx = db.transaction("encryptionKeys", "readwrite");
			const store = tx.objectStore("encryptionKeys");

			// Encrypt the key before storing it
			const key = generateRandomBytes(32);
			const { ciphertext, salt, nonce } = encrypt(encryptionKey, encodeBase64(key));

			// Store the encrypted key in the IndexedDB
			store.put({ id: "encryptionKey", ciphertext, salt, nonce, key: encodeBase64(key) });

			// Wait for the transaction to complete
			await new Promise<void>((resolve, reject) => {
				tx.oncomplete = () => resolve();
				tx.onerror = () => reject(tx.error);
				tx.onabort = () => reject(new Error("Transaction aborted"));
			});

			db.close();
			return true;
		} catch (error) {
			console.error("Failed to store the key in IndexedDB:", error);
			return false;
		}
	};

	const getEncryptionKey = async () => {
		try {
			const db = await openDB();
			const tx = db.transaction("encryptionKeys", "readonly");
			const store = tx.objectStore("encryptionKeys");
			const request = store.get("encryptionKey");

			// Retrieve the key from the IndexedDB
			const storedKey = await new Promise<StoredEncryptionKey>((resolve, reject) => {
				request.onsuccess = (event) => {
					const target = event.target as IDBRequest | null;
					if (target) {
						const result = target.result as StoredEncryptionKey | null;
						if (result) resolve(result);
						else reject(new Error("Encryption key not found in IndexedDB."));
					} else {
						reject(new Error("Failed to get the encryption key."));
					}
				};

				request.onerror = (event) => {
					const target = event.target as IDBRequest | null;
					reject(target?.error || new Error("Failed to get the encryption key."));
				};
			});
			if (!storedKey) return null;

			// Decrypt the key
			const key = decrypt(storedKey.ciphertext, storedKey.key, storedKey.salt, storedKey.nonce);

			// Close the database and return key
			db.close();
			return key;
		} catch (error) {
			console.error("Failed to get the key from IndexedDB:", error);
			return null;
		}
	};

	const clearEncryptionKey = async () => {
		try {
			const db = await openDB();
			const tx = db.transaction("encryptionKeys", "readwrite");
			const store = tx.objectStore("encryptionKeys");
			store.delete("encryptionKey");
			await new Promise<void>((resolve, reject) => {
				tx.oncomplete = () => resolve();
				tx.onerror = () => reject(tx.error);
				tx.onabort = () => reject(new Error("Transaction aborted"));
			});
			db.close();
		} catch (error) {
			console.error("Failed to clear the key from IndexedDB:", error);
		}
	};

	return { storeEncryptionKey, getEncryptionKey, clearEncryptionKey };
};

export default useIndexedDB;
