# 01 — JavaScript principles

## Thread of execution

JavaScript runs one line at a time, in order, and each line finishes before the next one
starts. Two things happen as it goes: it **executes** code, and it **stores** data (in memory)
as constants, variables and functions.

## Execution context

Every time a function is *called*, JavaScript creates a new **execution context** for it:

- a **thread of execution** (it runs the function body line by line), and
- its own **local memory** (a fresh, private variable environment).

When the function returns, its execution context is deleted, and its local memory with it.
That is the default. (Closure — module 03 — is the exception.)

## The call stack

JavaScript tracks which execution context it is currently inside with a **stack**:

- calling a function → **push** a new context on the stack
- returning from it → **pop** it off

Whatever is on top of the stack is where the thread of execution currently is. The bottom of
the stack is the *global* execution context. Recursion pushes many frames; push too many and
the engine throws a `RangeError: Maximum call stack size exceeded`.

## Hoisting

Before running any code, the engine scans the current scope and sets up memory:

- `function` declarations → fully available (body and all) before the line that declares them.
- `var` → declared and initialised to `undefined`.
- `let` / `const` → declared but **not** initialised. Touching them before their declaration
  line throws a `ReferenceError` — this window is the **temporal dead zone** (TDZ).

That is the whole trick behind most "what does this print?" puzzles.

## Things to be able to answer

- What exactly gets deleted when a function returns?
- Why can I call a `function`-declared function before it appears in the file, but not a
  `const`-declared arrow function?
- Where does the thread of execution "live" during a recursive call?
