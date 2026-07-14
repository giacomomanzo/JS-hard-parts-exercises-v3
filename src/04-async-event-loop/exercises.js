// 04 — Asynchronicity & the event loop
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:04

export const TODO = Symbol("TODO — replace me");

/* -------------------------------------------------------------------------- */
/* Exercise 1 — Predict the order                                              */
/*                                                                            */
/* The snippets below are given. Do NOT run them to find out — reason about    */
/* the call stack, the microtask queue and the callback queue, then write your */
/* prediction down. The test runs them for real and compares.                  */
/* -------------------------------------------------------------------------- */

// Snippet A — sync, macrotask, microtask
export function snippetA() {
  const log = [];
  log.push("start");
  setTimeout(() => log.push("timeout"), 0);
  Promise.resolve().then(() => log.push("promise"));
  log.push("end");
  return new Promise((resolve) => setTimeout(() => resolve(log), 10));
}

// Snippet B — a microtask that queues another microtask, and a 0ms timer
export function snippetB() {
  const log = [];
  setTimeout(() => log.push("timeout"), 0);
  Promise.resolve()
    .then(() => {
      log.push("then 1");
      return Promise.resolve();
    })
    .then(() => log.push("then 2"));
  log.push("sync");
  return new Promise((resolve) => setTimeout(() => resolve(log), 10));
}

// Snippet C — a long synchronous block AFTER the timer was registered
export function snippetC() {
  const log = [];
  setTimeout(() => log.push("timeout"), 0);
  const stopAt = Date.now() + 50;
  while (Date.now() < stopAt) {
    /* the thread of execution is stuck right here */
  }
  log.push("blocking loop done");
  return new Promise((resolve) => setTimeout(() => resolve(log), 60));
}

// Fill in what each snippet's log looks like once everything has settled.
export const predictions = {
  snippetA: ["start", "end", "promise", "timeout"], // e.g. ['start', 'end', 'promise', 'timeout']
  snippetB: ["sync", "then 1", "then 2", "timeout"],
  snippetC: ["blocking loop done", "timeout"],
};

/* -------------------------------------------------------------------------- */
/* Exercise 2 — delay                                                          */
/*                                                                            */
/* Call `callback` after `ms` milliseconds. Callback style: no promises here.  */
/* -------------------------------------------------------------------------- */

export function delay(ms, callback) {
  return setTimeout(callback, ms);
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — runInSeries                                                    */
/*                                                                            */
/* `tasks` is an array of async functions in callback style: each one takes a  */
/* single `done(result)` callback and calls it when it is finished.            */
/* Run them ONE AFTER THE OTHER (never in parallel — task 2 may only start     */
/* once task 1 has called its done), then call `finalCallback(results)` with   */
/* every result, in order.                                                     */
/*                                                                            */
/* This is the "callback hell" that promises were invented to fix. Feel it.    */
/* -------------------------------------------------------------------------- */

export function runInSeries(tasks, finalCallback) {
  const results = [];
  let index = 0;

  function runNextTask() {
    if (index >= tasks.length) {
      finalCallback(results);
      return;
    }
    tasks[index]((result) => {
      results.push(result);
      index++;
      runNextTask();
    });
  }

  runNextTask();
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — debounce                                                       */
/*                                                                            */
/* Return a wrapped function that only actually runs `fn` once `wait` ms have  */
/* passed with NO new call. Each new call cancels the pending one and restarts */
/* the timer. `fn` receives the arguments of the LAST call.                    */
/* -------------------------------------------------------------------------- */

export function debounce(fn, wait) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
}
