/**
 * Utility for Bangladeshi phone number normalization, English digit conversion,
 * and strict 11-digit validation.
 */

const BANGLA_TO_ENG: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/**
 * Converts Bengali digits to English digits
 */
export function toEnglishDigits(input: string): string {
  if (!input) return "";
  return String(input).replace(/[০-৯]/g, (char) => BANGLA_TO_ENG[char] || char);
}

/**
 * Normalizes a Bangladeshi phone number to English digits without spaces or symbols.
 * Handles cases like:
 * - 01712345678 -> 01712345678
 * - +8801712345678 -> 01712345678
 * - 8801712345678 -> 01712345678
 * - ০১৭১২৩৪৫৬৭৮ -> 01712345678
 * Limits max length to 11 digits.
 */
export function normalizeBangladeshiPhone(input: string): string {
  if (!input) return "";
  let digits = toEnglishDigits(input).trim().replace(/\D/g, "");
  if (digits.startsWith("8801") && digits.length >= 13) {
    digits = digits.substring(2);
  }
  return digits.slice(0, 11);
}

/**
 * Validates strictly: exactly 11 digits in English, starting with 01 and 3rd digit 3-9.
 */
export function isValidBangladeshiPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone);
}

/**
 * Format helper for UI display e.g. "01712-345678"
 */
export function formatPhoneDisplay(phone: string): string {
  const p = normalizeBangladeshiPhone(phone);
  if (p.length === 11) {
    return `${p.slice(0, 5)}-${p.slice(5)}`;
  }
  return p;
}
