// 03 — Closure
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:03
//
// Rule for this module: no state outside the functions. No module-level variables,
// no properties hung off the returned function. Everything lives in a backpack.

export const TODO = Symbol('TODO — replace me');

/* -------------------------------------------------------------------------- */
/* Exercise 1 — createCounter                                                  */
/*                                                                            */
/* Return a function that returns 1 the first time it is called, 2 the second, */
/* and so on. Two counters created separately must not interfere.             */
/* -------------------------------------------------------------------------- */

export function createCounter() {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 2 — once                                                           */
/*                                                                            */
/* Wrap `fn` so it can only ever run once. Every later call returns the result */
/* of that first run, without invoking `fn` again.                             */
/* -------------------------------------------------------------------------- */

export function once(fn) {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — memoize                                                        */
/*                                                                            */
/* Cache the result of `fn` per argument. `memoize(slowSquare)(4)` must call   */
/* `slowSquare` the first time and never again for 4.                          */
/* Assume a single argument that can be used as a Map key.                     */
/* -------------------------------------------------------------------------- */

export function memoize(fn) {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — createSecretHolder                                             */
/*                                                                            */
/* Return an object with `getSecret()` and `setSecret(value)`. The secret must */
/* be reachable ONLY through those two methods — no property on the object,    */
/* nothing enumerable, nothing gettable from the outside.                      */
/* -------------------------------------------------------------------------- */

export function createSecretHolder(initialSecret) {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 5 — createRotator                                                  */
/*                                                                            */
/* Return a function that hands back the items of `array` one at a time,       */
/* looping back to the start when it runs out.                                 */
/* const next = createRotator(['a', 'b']);                                     */
/* next() → 'a';  next() → 'b';  next() → 'a'                                  */
/* -------------------------------------------------------------------------- */

export function createRotator(array) {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 6 — createBankAccount                                              */
/*                                                                            */
/* The full "private state" pattern: return { deposit, withdraw, getBalance }. */
/* - deposit(amount) adds to the balance and returns the new balance           */
/* - withdraw(amount) refuses (returns the string 'Insufficient funds' and     */
/*   leaves the balance untouched) if the balance would go negative            */
/* - getBalance() reads it                                                     */
/* Every returned method must share ONE balance — the same backpack.           */
/* -------------------------------------------------------------------------- */

export function createBankAccount(initialBalance = 0) {
  return TODO;
}
