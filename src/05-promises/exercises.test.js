import { describe, expect, it, vi } from 'vitest';
import {
  allOf,
  mapSeries,
  promisify,
  retry,
  wait,
  withTimeout,
} from './exercises.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A rejected promise whose rejection is already marked as "seen", so that an
// unfinished exercise below produces a clean test failure instead of an
// unhandled rejection warning. It still rejects exactly like Promise.reject.
const rejectedWith = (message) => {
  const promise = Promise.reject(new Error(message));
  promise.catch(() => {});
  return promise;
};

describe('exercise 1 — wait', () => {
  it('fulfills with the value', async () => {
    await expect(wait(10, 'done')).resolves.toBe('done');
  });

  it('is still pending before the delay is up', async () => {
    let settled = false;
    wait(30, 'x').then(() => {
      settled = true;
    });

    await sleep(10);
    expect(settled).toBe(false);

    await sleep(40);
    expect(settled).toBe(true);
  });
});

describe('exercise 2 — promisify', () => {
  const readSuccess = (name, callback) => setTimeout(() => callback(null, `hello ${name}`), 1);
  const readFailure = (_name, callback) => setTimeout(() => callback(new Error('boom')), 1);

  it('fulfills with the callback result', async () => {
    await expect(promisify(readSuccess)('world')).resolves.toBe('hello world');
  });

  it('rejects with the callback error', async () => {
    await expect(promisify(readFailure)('world')).rejects.toThrow('boom');
  });
});

describe('exercise 3 — allOf', () => {
  it('fulfills with the results in the original order', async () => {
    const results = await allOf([wait(20, 'slow'), wait(1, 'fast'), Promise.resolve('now')]);
    expect(results).toEqual(['slow', 'fast', 'now']);
  });

  it('runs them concurrently, not one after the other', async () => {
    const start = Date.now();
    await allOf([wait(40, 'a'), wait(40, 'b'), wait(40, 'c')]);
    expect(Date.now() - start).toBeLessThan(100); // ~40ms, not ~120ms
  });

  it('rejects as soon as one of them rejects', async () => {
    const failing = allOf([wait(50, 'ok'), rejectedWith('nope')]);
    await expect(failing).rejects.toThrow('nope');
  });

  it('fulfills with an empty array for an empty input', async () => {
    await expect(allOf([])).resolves.toEqual([]);
  });
});

describe('exercise 4 — withTimeout', () => {
  it('passes the result through when it is fast enough', async () => {
    await expect(withTimeout(wait(5, 'in time'), 50)).resolves.toBe('in time');
  });

  it('rejects when the promise is too slow', async () => {
    await expect(withTimeout(wait(60, 'too late'), 10)).rejects.toThrow('Timed out');
  });

  it('passes a rejection through unchanged', async () => {
    await expect(withTimeout(rejectedWith('original'), 50)).rejects.toThrow('original');
  });
});

describe('exercise 5 — retry', () => {
  it('does not retry a success', async () => {
    const task = vi.fn(() => Promise.resolve('ok'));

    await expect(retry(task, 3)).resolves.toBe('ok');
    expect(task).toHaveBeenCalledTimes(1);
  });

  it('retries until it succeeds', async () => {
    let calls = 0;
    const flaky = vi.fn(() => {
      calls += 1;
      return calls < 3 ? Promise.reject(new Error('flaky')) : Promise.resolve('finally');
    });

    await expect(retry(flaky, 5)).resolves.toBe('finally');
    expect(flaky).toHaveBeenCalledTimes(3);
  });

  it('rejects with the last error once the attempts run out', async () => {
    let calls = 0;
    const always = () => Promise.reject(new Error(`failure ${++calls}`));

    await expect(retry(always, 3)).rejects.toThrow('failure 3');
    expect(calls).toBe(3);
  });
});

describe('exercise 6 — mapSeries', () => {
  it('returns the results in order', async () => {
    const results = await mapSeries([1, 2, 3], async (n) => n * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it('runs one at a time', async () => {
    const events = [];
    await mapSeries(['a', 'b'], async (item) => {
      events.push(`start ${item}`);
      await sleep(item === 'a' ? 20 : 1);
      events.push(`end ${item}`);
      return item;
    });

    expect(events).toEqual(['start a', 'end a', 'start b', 'end b']);
  });

  it('rejects if one of the items rejects', async () => {
    const failing = mapSeries([1, 2], async (n) => {
      if (n === 2) throw new Error('item 2 failed');
      return n;
    });

    await expect(failing).rejects.toThrow('item 2 failed');
  });
});
