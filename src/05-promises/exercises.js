// 05 — Promises
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:05
//
// Rule for this module: build the behaviour yourself. `Promise.all`, `Promise.race`
// and `util.promisify` are what you are re-implementing, so don't call them.

export const TODO = Symbol("TODO — replace me");

/* -------------------------------------------------------------------------- */
/* Exercise 1 — wait                                                           */
/*                                                                            */
/* Return a promise that fulfills with `value` after `ms` milliseconds.        */
/* The building block for everything below.                                    */
/* -------------------------------------------------------------------------- */

export function wait(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* -------------------------------------------------------------------------- */
/* Exercise 2 — promisify                                                      */
/*                                                                            */
/* Turn a Node-style callback function — fn(...args, (error, result) => ...) — */
/* into one that returns a promise. Reject with the error if there is one,     */
/* fulfill with the result otherwise.                                          */
/* -------------------------------------------------------------------------- */

export function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — allOf                                                          */
/*                                                                            */
/* Your own `Promise.all`. Take an array of promises, return a promise that:   */
/* - fulfills with an array of the results, IN THE ORIGINAL ORDER, once every  */
/*   input has fulfilled (they run concurrently — do not await them in a loop) */
/* - rejects as soon as any single one rejects, with that reason               */
/* - fulfills with [] for an empty array                                       */
/* -------------------------------------------------------------------------- */

export function allOf(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — withTimeout                                                    */
/*                                                                            */
/* Return a promise that settles like `promise`, unless `ms` milliseconds go   */
/* by first — in which case it rejects with `new Error('Timed out')`.          */
/* (Note what this does NOT do: the underlying work keeps running. A promise   */
/* is a placeholder, not a handle on the work.)                                */
/* -------------------------------------------------------------------------- */

export function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timed out"));
    }, ms);
    Promise.resolve(promise).then(
      (result) => {
        clearTimeout(timeoutId);
        resolve(result);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

/* -------------------------------------------------------------------------- */
/* Exercise 5 — retry                                                          */
/*                                                                            */
/* Call `makePromise()` (a function returning a promise). If it rejects, try   */
/* again, up to `attempts` times in total. Fulfill with the first success;     */
/* if every attempt fails, reject with the LAST error.                         */
/* -------------------------------------------------------------------------- */

export async function retry(makePromise, attempts) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await makePromise();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/* -------------------------------------------------------------------------- */
/* Exercise 6 — mapSeries                                                      */
/*                                                                            */
/* Run an async function over the items ONE AT A TIME (item n+1 only starts    */
/* after item n has settled), and fulfill with the array of results in order.  */
/* The sequential counterpart to `allOf` — the one you want when the API you   */
/* are hitting rate-limits you.                                                */
/* -------------------------------------------------------------------------- */

export async function mapSeries(items, asyncFn) {
  const results = [];
  for (const item of items) {
    results.push(await asyncFn(item));
  }
  return results;
}
