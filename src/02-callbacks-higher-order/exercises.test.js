import { describe, expect, it, vi } from 'vitest';
import {
  filterWith,
  groupBy,
  mapWith,
  pipe,
  reduceWith,
  repeat,
} from './exercises.js';

describe('exercise 1 — mapWith', () => {
  it('applies the callback to every element', () => {
    expect(mapWith([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
    expect(mapWith(['a', 'b'], (s) => s.toUpperCase())).toEqual(['A', 'B']);
  });

  it('returns a new array and leaves the original alone', () => {
    const original = [1, 2, 3];
    const result = mapWith(original, (n) => n + 1);

    expect(original).toEqual([1, 2, 3]);
    expect(result).not.toBe(original);
  });

  it('handles an empty array', () => {
    expect(mapWith([], (n) => n)).toEqual([]);
  });
});

describe('exercise 2 — reduceWith', () => {
  it('folds the array into a single value', () => {
    expect(reduceWith([1, 2, 3], (acc, n) => acc + n, 0)).toBe(6);
    expect(reduceWith(['a', 'b'], (acc, s) => acc + s, '')).toBe('ab');
  });

  it('returns the starting value for an empty array', () => {
    expect(reduceWith([], (acc, n) => acc + n, 99)).toBe(99);
  });

  it('can build a different shape than it started with', () => {
    const counts = reduceWith(
      ['a', 'b', 'a'],
      (acc, letter) => ({ ...acc, [letter]: (acc[letter] ?? 0) + 1 }),
      {},
    );
    expect(counts).toEqual({ a: 2, b: 1 });
  });
});

describe('exercise 3 — filterWith', () => {
  it('keeps only the elements that pass the test', () => {
    expect(filterWith([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
    expect(filterWith([1, 2, 3], () => true)).toEqual([1, 2, 3]);
    expect(filterWith([1, 2, 3], () => false)).toEqual([]);
  });

  it('is built on top of reduceWith', async () => {
    const source = await import('node:fs/promises').then((fs) =>
      fs.readFile(new URL('./exercises.js', import.meta.url), 'utf8'),
    );
    const body = source.slice(source.indexOf('export function filterWith'));
    expect(body.slice(0, body.indexOf('\n}'))).toMatch(/reduceWith\s*\(/);
  });
});

describe('exercise 4 — pipe', () => {
  it('runs the functions left to right', () => {
    expect(pipe((n) => n + 1, (n) => n * 2)(3)).toBe(8);
    expect(pipe((s) => s.trim(), (s) => s.length)('  hi  ')).toBe(2);
  });

  it('returns its input untouched when given no functions', () => {
    expect(pipe()(42)).toBe(42);
  });

  it('returns a reusable function', () => {
    const double = pipe((n) => n * 2);
    expect(double(2)).toBe(4);
    expect(double(5)).toBe(10);
  });
});

describe('exercise 5 — repeat', () => {
  it('calls the action once per iteration, with the index', () => {
    const action = vi.fn();
    repeat(3, action);

    expect(action).toHaveBeenCalledTimes(3);
    expect(action.mock.calls).toEqual([[0], [1], [2]]);
  });

  it('does nothing when times is 0', () => {
    const action = vi.fn();
    repeat(0, action);
    expect(action).not.toHaveBeenCalled();
  });
});

describe('exercise 6 — groupBy', () => {
  it('buckets the items by the key the callback returns', () => {
    expect(groupBy(['ant', 'bee', 'ape'], (word) => word[0])).toEqual({
      a: ['ant', 'ape'],
      b: ['bee'],
    });
  });

  it('works with a computed key', () => {
    expect(groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? 'even' : 'odd'))).toEqual({
      odd: [1, 3],
      even: [2, 4],
    });
  });

  it('returns an empty object for an empty array', () => {
    expect(groupBy([], (x) => x)).toEqual({});
  });
});
