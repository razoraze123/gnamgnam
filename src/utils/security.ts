/**
 * Sanitize user input to prevent basic XSS and injection attacks.
 * Removes < and > characters to prevent HTML tag creation.
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim();
}

/**
 * Validates if a phone number format is correct (8-15 digits)
 */
export function isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/\s/g, '');
    return /^[0-9]{8,15}$/.test(cleaned);
}
