import { describe, expect, it } from 'vitest';
import {
  Animal,
  Dog,
  Timer,
  createUser,
  myBind,
  myNew,
  userMethods,
} from './exercises.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('exercise 1 — createUser', () => {
  it('builds a working user', () => {
    const user = createUser('ada', 5);

    expect(user.name).toBe('ada');
    expect(user.increaseScore(3)).toBe(8);
    expect(user.describe()).toBe('ada has 8 points');
  });

  it('defaults the score to 0', () => {
    expect(createUser('ada').score).toBe(0);
  });

  it('keeps the methods off the instance, on the prototype', () => {
    const user = createUser('ada');

    expect(Object.keys(user).sort()).toEqual(['name', 'score']);
    expect(Object.getPrototypeOf(user)).toBe(userMethods);
    expect(Object.hasOwn(user, 'increaseScore')).toBe(false);
  });

  it('shares one copy of each method between all users', () => {
    expect(createUser('a').increaseScore).toBe(createUser('b').increaseScore);
  });

  it('gives each user its own state', () => {
    const a = createUser('a');
    const b = createUser('b');

    a.increaseScore();

    expect(a.score).toBe(1);
    expect(b.score).toBe(0);
  });
});

describe('exercise 2 — myNew', () => {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  Point.prototype.sum = function () {
    return this.x + this.y;
  };

  it('builds an instance from a constructor function', () => {
    const point = myNew(Point, 2, 3);

    expect(point.x).toBe(2);
    expect(point.sum()).toBe(5);
  });

  it('links it to Constructor.prototype', () => {
    const point = myNew(Point, 1, 1);

    expect(Object.getPrototypeOf(point)).toBe(Point.prototype);
    expect(point instanceof Point).toBe(true);
  });

  it('lets an explicitly returned object win', () => {
    function Weird() {
      this.ignored = true;
      return { chosen: true };
    }

    expect(myNew(Weird)).toEqual({ chosen: true });
  });

  it('ignores a returned primitive', () => {
    function AlsoWeird() {
      this.kept = true;
      return 42;
    }

    expect(myNew(AlsoWeird).kept).toBe(true);
  });
});

describe('exercise 3 — myBind', () => {
  const greeter = {
    greeting: 'hi',
    greet(name) {
      return `${this.greeting} ${name}`;
    },
  };

  it('pins `this` to the given object', () => {
    const bound = myBind(greeter.greet, greeter);
    expect(bound('ada')).toBe('hi ada');
  });

  it('survives being torn off and called bare', () => {
    const bound = myBind(greeter.greet, greeter);
    const detached = bound;

    expect(detached('ada')).toBe('hi ada');
  });

  it('partially applies the bound arguments', () => {
    const add = (a, b, c) => a + b + c;
    const addTo10 = myBind(add, null, 4, 6);

    expect(addTo10(1)).toBe(11);
  });
});

describe('exercise 4 — Animal and Dog', () => {
  it('gives Animal a name and a sound', () => {
    const animal = new Animal('generic');

    expect(animal.name).toBe('generic');
    expect(animal.speak()).toBe('generic makes a sound');
  });

  it('makes Dog an Animal', () => {
    const dog = new Dog('rex', 'corgi');

    expect(dog instanceof Dog).toBe(true);
    expect(dog instanceof Animal).toBe(true);
    expect(dog.name).toBe('rex');
    expect(dog.breed).toBe('corgi');
  });

  it('overrides speak and adds fetch', () => {
    const dog = new Dog('rex', 'corgi');

    expect(dog.speak()).toBe('rex barks');
    expect(dog.fetch()).toBe('rex fetches the ball');
  });

  it('keeps the methods on the prototypes, not on the instances', () => {
    const dog = new Dog('rex', 'corgi');

    expect(Object.keys(dog).sort()).toEqual(['breed', 'name']);
    expect(Object.hasOwn(Dog.prototype, 'speak')).toBe(true);
    expect(Object.hasOwn(Animal.prototype, 'speak')).toBe(true);
    expect(Object.getPrototypeOf(Dog.prototype)).toBe(Animal.prototype);
  });
});

describe('exercise 5 — the lost `this`', () => {
  it('confirms the broken version is really broken', async () => {
    const timer = new Timer();
    timer.startBroken();

    // What `this` becomes inside the callback is up to the host, so we don't
    // assert on it. What matters is that it is not the timer: the count on the
    // instance stays put.
    await sleep(10);
    expect(timer.count).toBe(0);
  });

  it('startWithArrow keeps `this`', async () => {
    const timer = new Timer();
    timer.startWithArrow();

    await sleep(10);
    expect(timer.count).toBe(1);
  });

  it('startWithBind keeps `this`', async () => {
    const timer = new Timer();
    timer.startWithBind();

    await sleep(10);
    expect(timer.count).toBe(1);
  });

  it('leaves tick as a real prototype method', () => {
    expect(Object.hasOwn(Timer.prototype, 'tick')).toBe(true);
    expect(Object.hasOwn(new Timer(), 'tick')).toBe(false);
  });
});
