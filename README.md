# UK Vehicle Registration

A zero-dependency TypeScript/JavaScript library for validating and formatting UK vehicle registration plates (number plates).

Supports the four main formats used in Great Britain:

- **Dateless** (1903-1963)
- **Suffix** (1963-1983)
- **Prefix** (1983-2001)
- **Current** (2001-Present)

> [!NOTE]
> Strictly validates against UK Mainland rules (e.g., excludes 'I' and 'Q' where appropriate, and 'Z' in region codes).

## Demo

[View Demo](https://htmlpreview.github.io/?https://github.com/roxburghm/uk-vehicle-reg/blob/main/demo/index.html)

## Installation

```bash
npm install uk-vehicle-reg
```

## Usage

### Validation

```typescript
import { validate } from 'uk-vehicle-reg';

const result = validate('BD51 SMR');

if (result.isValid) {
  console.log('Valid! Format:', result.format); // "Current"
} else {
  console.error('Invalid:', result.errors);
}
```

### Formatting

```typescript
import { format } from 'uk-vehicle-reg';

console.log(format('bd51smr')); // "BD51 SMR"
console.log(format('A1'));      // "A 1"
```

## Rules Implemented

- **Dateless**: 1-3 letters/1-4 numbers or vice versa. Max 6 chars. No I, Q, Z.
- **Suffix**: 3 letters, 1-3 numbers, Year Suffix. No I, Q, Z in initial block. No I, Q, Z, O, U in suffix.
- **Prefix**: Prefix Year, 1-3 numbers, 3 letters. No I, Q, Z, O, U in prefix. No I, Q, Z in final block.
- **Current**: 2 letters (Region), 2 numbers (Year), 3 letters (Random). No I, Q, Z in region. No I, Q in random.