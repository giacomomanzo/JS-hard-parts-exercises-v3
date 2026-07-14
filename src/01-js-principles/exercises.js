// 01 — JavaScript principles
//
// Read NOTES.md first. Replace every `TODO` with your answer / implementation,
// then run: npm run test:01

export const TODO = Symbol('TODO — replace me');

/* -------------------------------------------------------------------------- */
/* Exercise 1 — Predict the output                                            */
/*                                                                            */
/* Do NOT run the snippets below to find out. Reason about hoisting, the TDZ  */
/* and the order of the thread of execution, write down your prediction, and  */
/* let the test tell you whether you were right.                              */
/* -------------------------------------------------------------------------- */

// Snippet A — what does it return?
export function snippetA() {
  const log = [];
  log.push(typeof greet);
  log.push(typeof farewell);
  function greet() {}
  var farewell = function () {};
  return log;
}

// Snippet B — what does it return? (careful: does it even get there?)
export function snippetB() {
  const log = [];
  try {
    log.push(value);
    let value = 1;
  } catch (err) {
    log.push(err.constructor.name);
  }
  return log;
}

// Snippet C — in which order do the contexts finish?
export function snippetC() {
  const log = [];
  function outer() {
    log.push('outer start');
    inner();
    log.push('outer end');
  }
  function inner() {
    log.push('inner');
  }
  log.push('global start');
  outer();
  log.push('global end');
  return log;
}

// Fill in what each snippet returns. Arrays of strings.
export const predictions = {
  snippetA: TODO, // e.g. ['function', 'object']
  snippetB: TODO,
  snippetC: TODO,
};

/* -------------------------------------------------------------------------- */
/* Exercise 2 — sumTo                                                          */
/*                                                                            */
/* Sum every integer from 1 to n, recursively — one execution context per      */
/* number. Not with a loop, not with a formula: the point is to feel the stack.*/
/* sumTo(4) === 10, sumTo(1) === 1, sumTo(0) === 0                             */
/* -------------------------------------------------------------------------- */

export function sumTo(n) {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — countStackDepth                                                */
/*                                                                            */
/* Recurse until the engine refuses to push another frame, then return how     */
/* many frames deep you got. Catch the RangeError, don't let it escape.        */
/* (The exact number varies per engine and per run — that's fine and telling.) */
/* -------------------------------------------------------------------------- */

export function countStackDepth() {
  return TODO;
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — trace                                                          */
/*                                                                            */
/* Return the order in which execution contexts are *created* and *deleted*,   */
/* as the given call tree runs. Wrap the calls so that every function pushes    */
/* `enter <name>` when its context is created and `exit <name>` when it        */
/* returns. Implement `withTrace(fn, name, log)`: it returns a new function     */
/* that behaves exactly like `fn` (same arguments, same return value) but       */
/* records those two entries in `log`.                                          */
/* -------------------------------------------------------------------------- */

export function withTrace(fn, name, log) {
  return TODO;
}
