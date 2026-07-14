# 06 — Classes & prototypes

## The problem

You have thousands of users. Each needs its own data (`name`, `score`) but they can all share
the same *functionality* (`increaseScore`). Copying the function onto every object would be
one function object per user — wasteful, and impossible to update in one place.

## The mechanism: `__proto__` → prototype chain

Every object has a hidden link (`__proto__`, formally `[[Prototype]]`) to another object.
When you look up a property JavaScript cannot find on the object itself, it follows that link,
and keeps following it, until it finds the property or hits `null`.

`Object.create(someObject)` makes a new empty object whose link points at `someObject`.
That is the whole of "inheritance" in JavaScript. Not a copy — a **lookup path**.

## Three ways to write the same thing

1. **Factory + `Object.create`** — explicit. You build the object, you set the link, you return it.
2. **`new` + constructor function** — `new` does four things for you: creates an empty object,
   points its `__proto__` at `Fn.prototype`, calls `Fn` with `this` bound to that object, and
   returns it. (`Fn.prototype` is just an object that hangs off the function, automatically.
   Confusing name: it is not `Fn`'s own prototype.)
3. **`class`** — syntactic sugar over exactly the mechanism in (2). `constructor` is the
   function body; methods declared in the class body land on `Class.prototype`. Nothing new
   was added to the language's semantics.

## `this`

Determined by **how a function is called**, not where it is defined:

- `user.increaseScore()` → `this` is `user` (the thing left of the dot)
- `const f = user.increaseScore; f()` → `this` is `undefined` (in strict mode / modules)
- a callback passed to `setTimeout` loses it the same way

Arrow functions have no `this` of their own: they take it lexically, from the scope they were
*defined* in. That is why arrow methods inside a class body "just work" in callbacks — and why
an arrow function is the wrong choice for a method on a prototype.

## Things to be able to answer

- What is the difference between `dog.__proto__` and `Dog.prototype`?
- Where do the methods of a `class` actually live? How many copies exist for 1000 instances?
- What does `super()` do, and why must you call it before touching `this` in a subclass?
