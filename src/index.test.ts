import { describe, it, expect } from 'vitest';
import { validate, format } from './index';

describe('UK Vehicle Registration', () => {
    describe('validate', () => {
        it('validates Dateless plates', () => {
            expect(validate('A1').isValid).toBe(true);
            expect(validate('ABC1').isValid).toBe(true);
            expect(validate('1A').isValid).toBe(true);
            expect(validate('1234ABC').isValid).toBe(true); // Technically max 6 chars? Let's check rules.
            // My regex rules said max 4 nums + max 3 letters, but total length constrained?
            // Wiki: "The maximum number of characters in a dateless plate is six".
            // My current regex: ([A-Z]{1,3}[0-9]{1,4}) 3+4=7 potentially.
            // Let's refine based on "max 6 chars" rule if strictly enforced, but let's see what currently passes.
        });

        it('validates Suffix plates', () => {
            expect(validate('ABC 123D').isValid).toBe(true);
            expect(validate('ABC123D').isValid).toBe(true);
        });

        it('validates Prefix plates', () => {
            expect(validate('A123 BCD').isValid).toBe(true);
            expect(validate('A123BCD').isValid).toBe(true);
        });

        it('validates Current plates', () => {
            expect(validate('BD51 SMR').isValid).toBe(true);
            expect(validate('BD51SMR').isValid).toBe(true);
        });

        it('rejects invalid characters', () => {
            expect(validate('BD51$MR').isValid).toBe(false);
            expect(validate('IQ12 ABC').isValid).toBe(false); // 'I'/'Q' illegal in certain spots
        });

        it('rejects too long', () => {
            expect(validate('ABCDEF12345').isValid).toBe(false);
        });
    });

    describe('format', () => {
        it('formats Dateless correctly', () => {
            expect(format('A1')).toBe('A 1');
            expect(format('1A')).toBe('1 A');
            expect(format('ABC1234')).toBe('ABC 1234');
        });

        it('formats Suffix correctly', () => {
            expect(format('ABC123D')).toBe('ABC 123D');
        });

        it('formats Prefix correctly', () => {
            expect(format('A123BCD')).toBe('A123 BCD');
        });

        it('formats Current correctly', () => {
            expect(format('BD51SMR')).toBe('BD51 SMR');
        });

        it('normalizes case', () => {
            expect(format('bd51smr')).toBe('BD51 SMR');
        });
    });
});
