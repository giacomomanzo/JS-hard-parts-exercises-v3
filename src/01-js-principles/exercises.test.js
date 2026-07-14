import { describe, expect, it } from 'vitest';
import {
  countStackDepth,
  predictions,
  snippetA,
  snippetB,
  snippetC,
  sumTo,
  withTrace,
} from './exercises.js';

describe('exercise 1 — predict the output', () => {
  it('snippetA: hoisting of a function declaration vs a var', () => {
    expect(predictions.snippetA).toEqual(snippetA());
  });

  it('snippetB: touching a let before its declaration line', () => {
    expect(predictions.snippetB).toEqual(snippetB());
  });

  it('snippetC: the order in which execution contexts run', () => {
    expect(predictions.snippetC).toEqual(snippetC());
  });
});

describe('exercise 2 — sumTo', () => {
  it('sums the integers from 1 to n', () => {
    expect(sumTo(0)).toBe(0);
    expect(sumTo(1)).toBe(1);
    expect(sumTo(4)).toBe(10);
    expect(sumTo(100)).toBe(5050);
  });

  it('is recursive: it blows the call stack for a large enough n', () => {
    expect(() => sumTo(1e6)).toThrow(RangeError);
  });
});

describe('exercise 3 — countStackDepth', () => {
  it('returns how many frames fit on the call stack', () => {
    const depth = countStackDepth();
    expect(typeof depth).toBe('number');
    expect(depth).toBeGreaterThan(1000);
  });

  it('swallows the RangeError instead of throwing it', () => {
    expect(() => countStackDepth()).not.toThrow();
  });
});

describe('exercise 4 — withTrace', () => {
  it('records when a context is created and when it is deleted', () => {
    const log = [];
    const inner = withTrace(() => 'done', 'inner', log);
    const outer = withTrace(() => inner(), 'outer', log);

    expect(outer()).toBe('done');
    expect(log).toEqual([
      'enter outer',
      'enter inner',
      'exit inner',
      'exit outer',
    ]);
  });

  it('passes the arguments through and returns the return value', () => {
    const log = [];
    const add = withTrace((a, b) => a + b, 'add', log);

    expect(add(2, 3)).toBe(5);
    expect(log).toEqual(['enter add', 'exit add']);
  });
});
