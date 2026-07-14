// 02 — Callbacks & higher order functions
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:02
//
// Rule for this module: no built-in array methods (`map`, `filter`, `reduce`,
// `forEach`, `flat`, ...). You are here to build them, not to call them.

export const TODO = Symbol("TODO — replace me");

/* -------------------------------------------------------------------------- */
/* Exercise 1 — mapWith                                                        */
/*                                                                            */
/* Return a NEW array holding the result of calling `instructions` on every    */
/* element of `array`. The original array must not be touched.                 */
/* mapWith([1, 2, 3], n => n * 2)  →  [2, 4, 6]                                */
/* -------------------------------------------------------------------------- */

export function mapWith(array, instructions) {
  const result = [];

  for (const element of array) {
    result.push(instructions(element));
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Exercise 2 — reduceWith                                                     */
/*                                                                            */
/* Fold the array down to a single value. `howToCombine(accumulator, item)`    */
/* returns the next accumulator; `startingValue` is where you begin.           */
/* reduceWith([1, 2, 3], (acc, n) => acc + n, 0)  →  6                         */
/* -------------------------------------------------------------------------- */

export function reduceWith(array, howToCombine, startingValue) {
  let accumulator = startingValue;

  for (const element of array) {
    accumulator = howToCombine(accumulator, element);
  }

  return accumulator;
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — filterWith, built on reduceWith                                */
/*                                                                            */
/* Keep only the elements for which `test(item)` is truthy. The body of this   */
/* function must call `reduceWith` — that is the point of the exercise.        */
/* filterWith([1, 2, 3, 4], n => n % 2 === 0)  →  [2, 4]                       */
/* -------------------------------------------------------------------------- */

export function filterWith(array, test) {
  return reduceWith(
    array,
    (accumulator, element) => {
      if (test(element)) {
        accumulator.push(element);
      }

      return accumulator;
    },
    [],
  );
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — pipe                                                           */
/*                                                                            */
/* Take any number of functions and return ONE function that runs them         */
/* left to right, feeding each result into the next.                           */
/* pipe(n => n + 1, n => n * 2)(3)  →  8   (3 + 1 = 4, then 4 * 2 = 8)         */
/* pipe()(42)  →  42                                                           */
/* -------------------------------------------------------------------------- */

export function pipe(...fns) {
  return function (input) {
    let result = input;

    for (const fn of fns) {
      result = fn(result);
    }
    return result;
  };
}

/* -------------------------------------------------------------------------- */
/* Exercise 5 — repeat                                                         */
/*                                                                            */
/* Call `action` `times` times, passing it the current index (0-based).        */
/* Collect nothing, return nothing — this is a `forEach`, not a `map`.         */
/* -------------------------------------------------------------------------- */

export function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

/* -------------------------------------------------------------------------- */
/* Exercise 6 — groupBy                                                        */
/*                                                                            */
/* Bucket the items into an object, keyed by whatever `keyOf(item)` returns.   */
/* groupBy(['ant', 'bee', 'ape'], word => word[0])                             */
/*   →  { a: ['ant', 'ape'], b: ['bee'] }                                      */
/* -------------------------------------------------------------------------- */

export function groupBy(array, keyOf) {
  return reduceWith(
    array,
    (accumulator, element) => {
      const key = keyOf(element);

      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(element);

      return accumulator;
    },
    Object.create(null),
  );
}
