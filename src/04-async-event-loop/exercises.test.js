import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  debounce,
  delay,
  predictions,
  runInSeries,
  snippetA,
  snippetB,
  snippetC,
} from './exercises.js';

describe('exercise 1 — predict the order', () => {
  it('snippetA: sync, then microtask, then macrotask', async () => {
    expect(predictions.snippetA).toEqual(await snippetA());
  });

  it('snippetB: the microtask queue drains before the callback queue', async () => {
    expect(predictions.snippetB).toEqual(await snippetB());
  });

  it('snippetC: a blocked stack delays a 0ms timer', async () => {
    expect(predictions.snippetC).toEqual(await snippetC());
  });
});

describe('exercise 2 — delay', () => {
  it('calls the callback later, not now', async () => {
    const callback = vi.fn();
    delay(10, callback);

    expect(callback).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('exercise 3 — runInSeries', () => {
  const taskThatTakes = (ms, result) => (done) => setTimeout(() => done(result), ms);

  it('collects every result, in the order of the tasks', async () => {
    const results = await new Promise((resolve) => {
      runInSeries(
        [taskThatTakes(20, 'slow'), taskThatTakes(1, 'fast'), taskThatTakes(5, 'medium')],
        resolve,
      );
    });

    expect(results).toEqual(['slow', 'fast', 'medium']);
  });

  it('never starts a task before the previous one has finished', async () => {
    const events = [];
    const task = (name, ms) => (done) => {
      events.push(`start ${name}`);
      setTimeout(() => {
        events.push(`end ${name}`);
        done(name);
      }, ms);
    };

    await new Promise((resolve) => {
      runInSeries([task('a', 10), task('b', 1)], resolve);
    });

    expect(events).toEqual(['start a', 'end a', 'start b', 'end b']);
  });

  it('calls back immediately with an empty list of tasks', async () => {
    const results = await new Promise((resolve) => runInSeries([], resolve));
    expect(results).toEqual([]);
  });
});

// Here the timer is an implementation detail, not the thing under study, so we
// drive it by hand. (The prediction snippets above stay on real timers: there
// the runtime's own behaviour IS the thing under study.)
describe('exercise 4 — debounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('runs once, after the calls stop', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 20);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('runs with the arguments of the last call', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 20);

    debounced('first');
    debounced('last');

    await vi.advanceTimersByTimeAsync(20);
    expect(fn).toHaveBeenCalledWith('last');
  });

  it('restarts the clock on every call', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 30);

    debounced();
    await vi.advanceTimersByTimeAsync(20);
    debounced(); // resets: the first one must never fire
    await vi.advanceTimersByTimeAsync(20);

    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
