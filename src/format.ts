import { validate } from './validate';

export function format(plate: string): string {
    const validation = validate(plate);
    if (!validation.isValid) {
        return plate.toUpperCase(); // Return raw uppercase if invalid
    }

    const cleanPlate = plate.replace(/\s+/g, '').toUpperCase();

    switch (validation.format) {
        case 'Current':
            // BD51 SMR (2 chars, 2 nums, space, 3 chars)
            return `${cleanPlate.slice(0, 4)} ${cleanPlate.slice(4)}`;

        case 'Prefix':
            // A123 BCD (1 letter, 1-3 nums, space, 3 letters)
            // The last 3 are always letters. Everything before is the prefix group.
            const prefixSplit = cleanPlate.length - 3;
            return `${cleanPlate.slice(0, prefixSplit)} ${cleanPlate.slice(prefixSplit)}`;

        case 'Suffix':
            // ABC 123D (3 letters, space, 1-3 nums, 1 letter)
            // The first 3 are always letters.
            return `${cleanPlate.slice(0, 3)} ${cleanPlate.slice(3)}`;

        case 'Dateless':
            // Dateless is tricky because the split depends on where the numbers/letters switch behavior.
            // A 1 -> split after char
            // 1 A -> split after num

            // Find the boundary between digits and letters
            // Search for the first occurrence where type changes from Letter to Digit or Digit to Letter

            // Strategy: 
            // If starts with Letter: find first Digit.
            // If starts with Digit: find first Letter.

            const isFirstCharLetter = /[A-Z]/.test(cleanPlate[0]);
            let splitIndex = -1;

            if (isFirstCharLetter) {
                // A 1, ABC 123
                // Scan for first digit
                const match = cleanPlate.match(/\d/);
                if (match) {
                    splitIndex = match.index!;
                }
            } else {
                // 1 A, 123 ABC
                // Scan for first letter
                const match = cleanPlate.match(/[A-Z]/);
                if (match) {
                    splitIndex = match.index!;
                }
            }

            if (splitIndex !== -1) {
                return `${cleanPlate.slice(0, splitIndex)} ${cleanPlate.slice(splitIndex)}`;
            }
            return cleanPlate; // Should happen?

        default:
            return cleanPlate;
    }
}
