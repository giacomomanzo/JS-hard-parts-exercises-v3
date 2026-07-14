# 03 — Closure

## The premise

When a function returns, its execution context — and its local memory — is deleted.
Except when it isn't.

## What actually happens

When a function is **defined**, it gets a hidden link to the local memory of the environment
it was defined in (the spec calls it `[[Environment]]`; Will Sentance calls it the
**backpack**). If that function is returned out and stored somewhere, the memory it links to
is *not* garbage collected — the returned function is still holding on to it.

```js
function createCounter() {
  let count = 0;               // lives in createCounter's local memory
  return function increment() {
    count++;                   // not local, not global — it's in the backpack
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2   ← the same count, still alive
```

The key detail: the backpack is attached **where the function was defined**, not where it is
called. Lexical (static) scope. And it is attached to *that particular function object* — call
`createCounter()` twice and you get two functions with two independent backpacks.

## The scope chain

When the thread hits an identifier, it looks:

1. in local memory,
2. then in the backpack (the environment where the function was *defined*),
3. then outward, up to global,
4. then `ReferenceError`.

## What it buys you

- Private state: data no one outside can reach, except through the functions you returned.
- Memoization: keep a cache alive between calls without polluting the global scope.
- Function factories: `once`, `throttle`, partial application, iterators, modules.
- Every asynchronous callback in module 04/05 relies on it — by the time the callback runs,
  the function that set it up has long returned.

## Things to be able to answer

- Two functions returned from the same call: do they share a backpack? What about from two
  separate calls?
- Why is the classic `for (var i = 0; ...) setTimeout(() => console.log(i))` printing the same
  number every time — and why does `let` fix it?
