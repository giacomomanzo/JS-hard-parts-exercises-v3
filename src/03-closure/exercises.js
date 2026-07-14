// 03 — Closure
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:03
//
// Rule for this module: no state outside the functions. No module-level variables,
// no properties hung off the returned function. Everything lives in a backpack.

export const TODO = Symbol("TODO — replace me");

/* -------------------------------------------------------------------------- */
/* Exercise 1 — createCounter                                                  */
/*                                                                            */
/* Return a function that returns 1 the first time it is called, 2 the second, */
/* and so on. Two counters created separately must not interfere.             */
/* -------------------------------------------------------------------------- */

export function createCounter() {
  let count = 0;

  function counter() {
    return ++count;
  }

  return counter;
}

/* -------------------------------------------------------------------------- */
/* Exercise 2 — once                                                           */
/*                                                                            */
/* Wrap `fn` so it can only ever run once. Every later call returns the result */
/* of that first run, without invoking `fn` again.                             */
/* -------------------------------------------------------------------------- */

export function once(fn) {
  let hasRun = false;
  let result;

  return function (...args) {
    if (!hasRun) {
      result = fn.apply(this, args);
      hasRun = true;
    }

    return result;
  };
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — memoize                                                        */
/*                                                                            */
/* Cache the result of `fn` per argument. `memoize(slowSquare)(4)` must call   */
/* `slowSquare` the first time and never again for 4.                          */
/* Assume a single argument that can be used as a Map key.                     */
/* -------------------------------------------------------------------------- */

export function memoize(fn) {
  const cache = new Map();

  return function (arg) {
    if (!cache.has(arg)) {
      cache.set(arg, fn(arg));
    }

    return cache.get(arg);
  };
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — createSecretHolder                                             */
/*                                                                            */
/* Return an object with `getSecret()` and `setSecret(value)`. The secret must */
/* be reachable ONLY through those two methods — no property on the object,    */
/* nothing enumerable, nothing gettable from the outside.                      */
/* -------------------------------------------------------------------------- */

export function createSecretHolder(initialSecret) {
  function getSecret() {
    return initialSecret;
  }

  function setSecret(value) {
    initialSecret = value;
  }

  return { getSecret, setSecret };
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
  let index = 0;

  return function () {
    const value = array[index];
    index = (index + 1) % array.length;
    return value;
  };
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
  function deposit(amount) {
    initialBalance += amount;
    return initialBalance;
  }

  function withdraw(amount) {
    if (initialBalance - amount < 0) {
      return "Insufficient funds";
    }

    initialBalance -= amount;
    return initialBalance;
  }

  function getBalance() {
    return initialBalance;
  }

  return { deposit, withdraw, getBalance };
}
