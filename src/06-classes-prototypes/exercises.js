// 06 — Classes & prototypes
//
// Read NOTES.md first, then replace every TODO. Run: npm run test:06

export const TODO = Symbol("TODO — replace me");

/* -------------------------------------------------------------------------- */
/* Exercise 1 — The factory, done by hand                                      */
/*                                                                            */
/* `userMethods` is given. Build `createUser` so that the object it returns    */
/* has ONLY `name` and `score` as its own properties, and finds `increaseScore`*/
/* and `describe` through its prototype chain.                                 */
/* Use Object.create. Do not copy the methods onto the instance.               */
/* -------------------------------------------------------------------------- */

export const userMethods = {
  increaseScore(by = 1) {
    this.score += by;
    return this.score;
  },
  describe() {
    return `${this.name} has ${this.score} points`;
  },
};

export function createUser(name, score = 0) {
  const user = Object.create(userMethods);
  user.name = name;
  user.score = score;

  return user;
}

/* -------------------------------------------------------------------------- */
/* Exercise 2 — myNew                                                          */
/*                                                                            */
/* Re-implement the `new` keyword as a function. `myNew(Constructor, ...args)` */
/* must do exactly what `new Constructor(...args)` does:                       */
/*   1. create an empty object                                                 */
/*   2. link it to Constructor.prototype                                       */
/*   3. run Constructor with `this` bound to it                                */
/*   4. return that object — unless the constructor returned an object itself, */
/*      in which case that one wins                                            */
/* You may not use the `new` keyword, or Reflect.construct.                    */
/* -------------------------------------------------------------------------- */

export function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);

  return result instanceof Object ? result : obj;
}

/* -------------------------------------------------------------------------- */
/* Exercise 3 — myBind                                                         */
/*                                                                            */
/* Return a copy of `fn` permanently bound to `thisArg`, whose `this` cannot   */
/* be re-pointed by how it is called. Any arguments given here are prepended   */
/* to the ones given at call time (partial application).                       */
/* You may not use Function.prototype.bind.                                    */
/* -------------------------------------------------------------------------- */

export function myBind(fn, thisArg, ...boundArgs) {
  return function (...args) {
    return fn.apply(thisArg, [...boundArgs, ...args]);
  };
}

/* -------------------------------------------------------------------------- */
/* Exercise 4 — class Animal / class Dog                                       */
/*                                                                            */
/* Animal: constructed with a name, has a `speak()` returning                  */
/*   `${name} makes a sound`, and a `name` own property.                       */
/* Dog: extends Animal, constructed with (name, breed), adds a `breed` own     */
/*   property, and OVERRIDES speak() to return `${name} barks`.                */
/* Dog also gets `fetch()`, returning `${name} fetches the ball`.              */
/* Methods must live on the prototype — no arrow-function class fields.        */
/* -------------------------------------------------------------------------- */

export class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

export class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  fetch() {
    return `${this.name} fetches the ball`;
  }
}

/* -------------------------------------------------------------------------- */
/* Exercise 5 — Fix the lost `this`                                            */
/*                                                                            */
/* `Timer` below is broken: when `start` hands `tick` to setTimeout, `this` is */
/* lost and the count never increases. Fix it — twice, in two different ways:  */
/*   - startWithArrow: keep `tick` a normal prototype method, but preserve     */
/*     `this` at the call site using an arrow function                          */
/*   - startWithBind: preserve it with .bind instead                            */
/* Do NOT turn `tick` itself into an arrow-function class field.               */
/* -------------------------------------------------------------------------- */

export class Timer {
  constructor() {
    this.count = 0;
  }

  tick() {
    this.count += 1;
  }

  startBroken() {
    setTimeout(this.tick, 0); // `this` is undefined by the time it runs
  }

  startWithArrow() {
    setTimeout(() => this.tick(), 0);
  }

  startWithBind() {
    setTimeout(this.tick.bind(this), 0);
  }
}
