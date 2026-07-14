# 04 — Asynchronicity & the event loop

## The problem

JavaScript has **one** thread of execution. If something takes 2 seconds (a network request,
a timer), running it "in order" means the whole page freezes for 2 seconds. But we also can't
just skip ahead: we need the result *eventually*, and we need it in a predictable place.

## The solution: three things that are not JavaScript

1. **The runtime's APIs** (Web APIs in the browser, libuv in Node). `setTimeout`, `fetch`,
   `addEventListener` — none of these are part of the JS engine. You hand a function and some
   instructions *out* of JavaScript, and the runtime does the waiting.
2. **The callback queue** (a.k.a. task/macrotask queue). When the runtime is done, it doesn't
   run your callback — it *queues* it.
3. **The event loop**. It checks, continuously: is the call stack empty? Is all the global
   code done? Only then does it take the first callback off the queue and push it onto the
   stack.

So `setTimeout(fn, 0)` does not mean "run `fn` now". It means "run `fn` as soon as the stack
is empty and it's `fn`'s turn in the queue" — which can be much later than 0 ms.

## Two queues, not one

Promise callbacks (`.then`, `await` continuations, `queueMicrotask`) go into a separate
**microtask queue**, which the event loop drains **completely** before it takes even one item
from the callback queue. Priority order:

1. everything synchronous, until the stack is empty
2. the entire microtask queue (including microtasks queued *by* microtasks)
3. one macrotask (a `setTimeout`, an I/O callback), then back to step 2

## The consequence you must internalise

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1, 4, 3, 2
```

Nothing here is "parallel" and nothing is "out of order". It is strict FIFO through three
gates: sync → microtasks → macrotasks.

## Things to be able to answer

- Where does the callback live between `setTimeout(fn, 1000)` and the moment `fn` runs?
- Can a `setTimeout(fn, 0)` be delayed by 5 seconds? By what?
- What guarantees does closure give you about the variables a queued callback reads?
