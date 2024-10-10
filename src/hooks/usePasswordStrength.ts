import commonPasswords from "../data/commonPasswords.json";

export enum PasswordStrength {
	NO_INPUT = 0,
	WEAK = 1,
	MEDIUM = 2,
	STRONG = 3,
	VERY_STRONG = 4,
}

const usePasswordStrength = (password: string) => {
	if (password?.length === 0) return PasswordStrength.NO_INPUT; // No input yet
	let strength = 0;

	// Test length
	if (password.length <= 4) return PasswordStrength.WEAK;
	if (password.length >= 6) strength += 1;
	if (password.length >= 12) strength += 1;

	// Test character types
	if (/[a-z]/.test(password)) strength += 1;
	if (/[A-Z]/.test(password)) strength += 1;
	if (/[0-9]/.test(password)) strength += 1;
	if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

	// Check for a common password
	if (commonPasswords.includes(password)) strength = Math.max(0, strength - 2);

	// Return strength
	if (strength >= 5) return PasswordStrength.VERY_STRONG;
	if (strength >= 4) return PasswordStrength.STRONG;
	if (strength >= 3) return PasswordStrength.MEDIUM;
	return PasswordStrength.WEAK;
};

export default usePasswordStrength;
