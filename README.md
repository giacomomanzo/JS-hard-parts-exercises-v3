# JavaScript: The Hard Parts — Exercises

Original exercises on the "hard parts" of JavaScript: the call stack, higher order functions,
closure, the event loop, promises and the prototype chain.

Each module contains:

- **`NOTES.md`** — my notes on the concept, written by hand while studying.
- **`exercises.js`** — the functions to implement (they ship as failing stubs).
- **`exercises.test.js`** — the tests, already written. The goal is to make them all pass.

> Inspired by the topics of _JavaScript: The Hard Parts v3_ by Will Sentance (Frontend Masters).
> The exercises, tests and notes in this repo are written by me — they are not the course
> material, which remains the property of its authors.

## You are on the `starter` branch

This branch holds the exercises **unsolved**: every `exercises.js` ships failing stubs, and
the whole suite is red on purpose. That is the starting line.

My own completed solutions live on [`main`](../../tree/main) — worth a look only after you
have written your own, or you will spend the afternoon reading instead of thinking.

## Usage

```bash
npm install       # once
npm run dev       # watch mode: implement, save, watch it go green
npm test          # run every test once
npm run test:03   # run a single module (closure)
```

Open a module, read `NOTES.md`, then fill in the stubs in `exercises.js` until the tests are
green. **Don't edit the test files**: if a test fails, the bug is in the implementation (or in
your mental model of the concept, which is exactly the point).

## Modules

| #   | Module                                                               | Concepts                                                       |
| --- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| 01  | [JS principles](src/01-js-principles/)                               | thread of execution, execution context, call stack, hoisting   |
| 02  | [Callbacks & higher order functions](src/02-callbacks-higher-order/) | functions as values, callbacks, composition                    |
| 03  | [Closure](src/03-closure/)                                           | scope chain, the "backpack", persistent state                  |
| 04  | [Async & the event loop](src/04-async-event-loop/)                   | Web APIs, callback queue, microtask queue, event loop          |
| 05  | [Promises](src/05-promises/)                                         | then/catch, microtasks, `Promise.all`, async/await             |
| 06  | [Classes & prototypes](src/06-classes-prototypes/)                   | `Object.create`, prototype chain, `this`, `new`, `class`       |

## Suggested order

The modules build on each other. Modules 04 and 05 in particular make little sense before
you are comfortable with callbacks (02) and closure (03).

## License

MIT — see [LICENSE](LICENSE).