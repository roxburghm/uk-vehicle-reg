// Character Sets
// NO_IQZ:   [A-HJ-PR-Y]      (A-Z except I, Q, Z)
// NO_IQ:    [A-HJ-PR-Z]      (A-Z except I, Q)
// NO_IQZOU: [A-HJ-NPR-TV-Y]  (A-Z except I, Q, Z, O, U)

// Dateless (1903-1963)
// Format 1: 1-3 letters, space, 1-4 numbers
// Format 2: 1-4 numbers, space, 1-3 letters
// Excludes I, Q, Z
export const DATELESS_REGEX = /^(([A-HJ-PR-Y]{1,3}[0-9]{1,4})|([0-9]{1,4}[A-HJ-PR-Y]{1,3}))$/;

// Suffix (1963-1983)
// Format: 3 letters (No I,Q,Z), space, 1-3 numbers, space, 1 letter (Year Suffix: No I,Q,Z,O,U)
export const SUFFIX_REGEX = /^([A-HJ-PR-Y]{3}[0-9]{1,3}[A-HJ-NPR-TV-Y])$/;

// Prefix (1983-2001)
// Format: 1 letter (Year Prefix: No I,Q,Z,O,U), 1-3 numbers, space, 3 letters (No I,Q,Z)
export const PREFIX_REGEX = /^([A-HJ-NPR-TV-Y][0-9]{1,3}[A-HJ-PR-Y]{3})$/;

// Current (2001-Present)
// Format: 2 letters (Region: No I,Q,Z), 2 numbers (Year), space, 3 letters (Random: No I,Q)
export const CURRENT_REGEX = /^([A-HJ-PR-Y]{2}[0-9]{2}[A-HJ-PR-Z]{3})$/;
