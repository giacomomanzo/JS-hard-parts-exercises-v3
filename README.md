# JavaScript: The Hard Parts — Exercises

[![Tests](https://github.com/giacomomanzo/JS-hard-parts-exercises-v3/actions/workflows/tests.yml/badge.svg)](https://github.com/giacomomanzo/JS-hard-parts-exercises-v3/actions/workflows/tests.yml)

This repository documents my study of JavaScript's execution model.

Rather than reproducing the exercises of a course, I wrote **original problems and
tests** to check whether I had actually understood execution contexts, closures,
asynchronicity, promises and the prototype chain — on the principle that you only
know a mechanism once you can rebuild it. So the repo contains, among other things,
a hand-rolled `Promise.all`, a `new` implemented as a plain function, and a
sequential task runner written twice: once in callback style, once with promises.

> The topics follow _JavaScript: The Hard Parts v3_ by Will Sentance (Frontend Masters).
> The exercises, tests and notes here are mine — they are not the course material,
> which remains the property of its authors.

## Two branches

| Branch | What's in it |
| --- | --- |
| **`main`** (here) | my completed solutions |
| **[`starter`](../../tree/starter)** | the same exercises, unsolved — the failing stubs |

Want to work through them yourself? Start from [`starter`](../../tree/starter): the
tests are already written there, and the job is to turn them green.

```bash
git clone --branch starter https://github.com/giacomomanzo/JS-hard-parts-exercises-v3.git
npm install
npm run dev     # watch mode: implement, save, watch it go green
```

## The modules

| # | Topic | What I built |
| --- | --- | --- |
| 01 | [JavaScript principles](src/01-js-principles/) | hoisting/TDZ predictions, recursive `sumTo`, `countStackDepth`, `withTrace` |
| 02 | [Callbacks & higher order functions](src/02-callbacks-higher-order/) | `mapWith`, `reduceWith`, `filterWith`, `pipe`, `repeat`, `groupBy` |
| 03 | [Closure](src/03-closure/) | `createCounter`, `once`, `memoize`, `createSecretHolder`, `createRotator`, `createBankAccount` |
| 04 | [Async & the event loop](src/04-async-event-loop/) | event-loop order predictions, `delay`, `runInSeries`, `debounce` |
| 05 | [Promises](src/05-promises/) | `wait`, `promisify`, `allOf` (my own `Promise.all`), `withTimeout`, `retry`, `mapSeries` |
| 06 | [Classes & prototypes](src/06-classes-prototypes/) | `Object.create` factory, `myNew`, `myBind`, `Animal`/`Dog`, the lost `this` |

Every module carries a `NOTES.md` with the theory, an `exercises.js` and an
`exercises.test.js`. 88 tests, all green.

## The bit I found most useful

Two modules don't ask for an implementation at all: they ask for a **prediction**.
You are given a snippet — hoisting, the temporal dead zone, the order of
synchronous code against microtasks against macrotasks — and you have to write down
what you think it prints, in an object the test then compares against what the
snippet really does at runtime.

There is no cheating your way through it: either your model of the event loop is
right, or the test is red. It is where I learned that `setTimeout(fn, 0)` doesn't
mean "run now" — it means "not before the call stack is empty", which in the
presence of a 50ms blocking loop is a very different promise.

## Running the tests

```bash
npm test          # everything, once
npm run dev       # watch mode
npm run test:03   # a single module
```

## License

MIT — see [LICENSE](LICENSE).
