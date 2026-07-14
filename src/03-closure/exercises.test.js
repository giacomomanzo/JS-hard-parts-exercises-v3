import { describe, expect, it, vi } from 'vitest';
import {
  createBankAccount,
  createCounter,
  createRotator,
  createSecretHolder,
  memoize,
  once,
} from './exercises.js';

describe('exercise 1 — createCounter', () => {
  it('counts up across calls', () => {
    const counter = createCounter();
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
    expect(counter()).toBe(3);
  });

  it('gives each counter its own backpack', () => {
    const a = createCounter();
    const b = createCounter();

    a();
    a();

    expect(a()).toBe(3);
    expect(b()).toBe(1);
  });
});

describe('exercise 2 — once', () => {
  it('runs the function only the first time', () => {
    const fn = vi.fn(() => 'result');
    const guarded = once(fn);

    expect(guarded()).toBe('result');
    expect(guarded()).toBe('result');
    expect(guarded()).toBe('result');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the first call arguments through', () => {
    const add = once((a, b) => a + b);
    expect(add(2, 3)).toBe(5);
    expect(add(10, 10)).toBe(5); // the cached first result, not 20
  });

  it('remembers a falsy result too', () => {
    const fn = vi.fn(() => undefined);
    const guarded = once(fn);

    guarded();
    guarded();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('exercise 3 — memoize', () => {
  it('computes once per distinct argument', () => {
    const square = vi.fn((n) => n * n);
    const fast = memoize(square);

    expect(fast(4)).toBe(16);
    expect(fast(4)).toBe(16);
    expect(square).toHaveBeenCalledTimes(1);

    expect(fast(5)).toBe(25);
    expect(square).toHaveBeenCalledTimes(2);
  });

  it('gives each memoized function its own cache', () => {
    const spyA = vi.fn((n) => n);
    const spyB = vi.fn((n) => n);
    const a = memoize(spyA);
    const b = memoize(spyB);

    a(1);
    b(1);

    expect(spyA).toHaveBeenCalledTimes(1);
    expect(spyB).toHaveBeenCalledTimes(1);
  });
});

describe('exercise 4 — createSecretHolder', () => {
  it('gets and sets the secret', () => {
    const holder = createSecretHolder('hunter2');

    expect(holder.getSecret()).toBe('hunter2');
    holder.setSecret('correct horse');
    expect(holder.getSecret()).toBe('correct horse');
  });

  it('keeps the secret out of the object itself', () => {
    const holder = createSecretHolder('hunter2');
    const exposed = JSON.stringify(holder) + Object.keys(holder).join();

    expect(exposed).not.toContain('hunter2');
    expect(Object.keys(holder).sort()).toEqual(['getSecret', 'setSecret']);
  });

  it('gives each holder its own secret', () => {
    const a = createSecretHolder('a');
    const b = createSecretHolder('b');

    a.setSecret('changed');

    expect(a.getSecret()).toBe('changed');
    expect(b.getSecret()).toBe('b');
  });
});

describe('exercise 5 — createRotator', () => {
  it('cycles through the items forever', () => {
    const next = createRotator(['a', 'b', 'c']);

    expect([next(), next(), next(), next(), next()]).toEqual([
      'a',
      'b',
      'c',
      'a',
      'b',
    ]);
  });

  it('handles a single-item array', () => {
    const next = createRotator(['only']);
    expect([next(), next()]).toEqual(['only', 'only']);
  });
});

describe('exercise 6 — createBankAccount', () => {
  it('starts at the initial balance, or zero', () => {
    expect(createBankAccount(100).getBalance()).toBe(100);
    expect(createBankAccount().getBalance()).toBe(0);
  });

  it('shares one balance between the methods', () => {
    const account = createBankAccount(50);

    expect(account.deposit(25)).toBe(75);
    expect(account.withdraw(30)).toBe(45);
    expect(account.getBalance()).toBe(45);
  });

  it('refuses to overdraw and leaves the balance alone', () => {
    const account = createBankAccount(10);

    expect(account.withdraw(50)).toBe('Insufficient funds');
    expect(account.getBalance()).toBe(10);
  });

  it('keeps the balance private', () => {
    const account = createBankAccount(10);
    expect(Object.keys(account).sort()).toEqual([
      'deposit',
      'getBalance',
      'withdraw',
    ]);
  });
});
