import commonPasswords from "../data/commonPasswords.json";
/*
    0: No input
    1: Weak
    2: Medium
    3: Strong
    4: Very strong
*/

const usePasswordStrength = (password: string) => {
	if (password?.length === 0) return 0; // No input yet
	let strength = 0;

	// Test length
	if (password.length <= 4) return 1;
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
	if (strength >= 5) return 4;
	if (strength >= 4) return 3;
	if (strength >= 3) return 2;
	return 1;
};

export default usePasswordStrength;
