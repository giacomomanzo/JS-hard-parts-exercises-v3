# 05 — Promises

## What a promise actually is

An object with two hidden slots — `[[PromiseState]]` (pending / fulfilled / rejected) and
`[[PromiseResult]]` (the value) — plus a hidden list of **onFulfilled** functions. Nothing
magic: `.then(fn)` just pushes `fn` onto that list and returns a *new* promise.

Two things happen when you call an async API that returns a promise:

1. the placeholder object is created and handed straight back (synchronously), and
2. the actual work is started **outside** JavaScript, in the runtime.

When the work finishes, the runtime fills the promise's result slot and queues its stored
functions — **on the microtask queue**, so they run before any `setTimeout` callback that was
already waiting.

## `.then` returns a new promise

That is the whole reason chaining works, and the reason a value returned from a `.then`
becomes the input of the next one. If you return a *promise* from a `.then`, the chain waits
for it (it "unwraps" — that's what makes it a monad, if you like that word).

## async / await

Syntax over the same machinery. `await` **pauses the function's execution context** — it is
popped off the stack, and the rest of the function body is queued as a microtask to resume
when the promise settles. Nothing is blocked; the thread goes back to the event loop.

```js
async function go() {
  console.log('a');
  await null;          // ← everything below is a microtask now
  console.log('c');
}
go();
console.log('b');      // a, b, c
```

## Errors

A rejection travels down the chain until it hits a `.catch` (or a `try/catch` around an
`await`). No handler → unhandled rejection. `.catch` returns a promise too, so the chain
*recovers* and keeps going after it.

## Things to be able to answer

- Why does `.then` fire before a `setTimeout(fn, 0)` that was registered first?
- What is the difference between `return somePromise` and `return await somePromise` inside a
  `.then`/async function?
- `Promise.all` vs a loop of `await`: which one is concurrent, and why does it matter?
