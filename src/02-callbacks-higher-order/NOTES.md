# 02 — Callbacks & higher order functions

## Functions are values

A function is an object with a special `()` property: you can store it in a variable, put it
in an array, pass it as an argument, return it from another function. Nothing special is
happening — a function name is just a label pointing at a value.

## Higher order function

A function that either **takes a function as an argument** or **returns a function**.
That's the whole definition. The function you hand over is the **callback**.

## Why bother

Generalise the *shape* of the work once, and let the caller inject the specific *bit* of work:

```js
const copyArrayAndManipulate = (array, instructions) => {
  const output = [];
  for (const item of array) output.push(instructions(item));
  return output;
};
```

`copyArrayAndManipulate` owns the loop, the new array, the push — the boring, repeated part.
`instructions` is the interesting part, and it is the caller's business. This is the DRY
principle applied to control flow. (`map`, `filter`, `reduce`, `forEach` are exactly this.)

## The part that trips people up

When the callback runs, it gets its **own execution context**, pushed on top of the higher
order function's. Two consequences:

- The parameter name inside the HOF (`instructions`) and the function name outside (`multiplyBy2`)
  are two labels on the same function value.
- Passing `multiplyBy2` and calling `multiplyBy2()` are completely different things. The first
  hands over the function itself; the second hands over whatever it *returned*.

## Things to be able to answer

- What is the difference between `arr.forEach(fn)` and `arr.forEach(fn())`?
- Which execution context is on the stack while the callback body runs?
- Why is `reduce` enough to build `map` and `filter`?
