import { DATELESS_REGEX, SUFFIX_REGEX, PREFIX_REGEX, CURRENT_REGEX } from './rules';

export interface ValidationResult {
    isValid: boolean;
    format?: 'Dateless' | 'Suffix' | 'Prefix' | 'Current';
    errors: string[];
}

export function validate(plate: string): ValidationResult {
    // Normalize: remove spaces, optional uppercase
    const cleanPlate = plate.replace(/\s+/g, '').toUpperCase();
    const errors: string[] = [];

    if (!cleanPlate) {
        return { isValid: false, errors: ['Input is empty'] };
    }

    // Check Current Style first (most common)
    if (CURRENT_REGEX.test(cleanPlate)) {
        return { isValid: true, format: 'Current', errors: [] };
    }

    // Check Prefix Style
    if (PREFIX_REGEX.test(cleanPlate)) {
        return { isValid: true, format: 'Prefix', errors: [] };
    }

    // Check Suffix Style
    if (SUFFIX_REGEX.test(cleanPlate)) {
        return { isValid: true, format: 'Suffix', errors: [] };
    }

    // Check Dateless Style
    if (DATELESS_REGEX.test(cleanPlate)) {
        // Additional Dateless Check: Max 6 characters
        if (cleanPlate.length > 6) {
            // Technically this might be caught by regex, but good to be explicit if regex matched loosely
            // However, our regex strictly enforces char counts, so this block might purely be defensive.
            // Let's rely on the regex for now.
        }
        return { isValid: true, format: 'Dateless', errors: [] };
    }

    // If no match, try to give helpful feedback
    if (cleanPlate.length > 7) {
        errors.push('Registration is too long (max 7 characters allowed)');
    }

    if (/[IQ]/.test(cleanPlate)) {
        errors.push('Contains illegal characters (I or Q are typically not allowed in mainland formats)');
    }

    return { isValid: false, errors: errors.length > 0 ? errors : ['Invalid format'] };
}
