import type { Subject } from "@xan/subject";
import { isObserver, type Observer } from "@xan/observer";
import { ReplaySubject } from "@xan/replay-subject";
import type { BehaviorSubjectConstructor } from "./behavior-subject-constructor.ts";

/**
 * Object type that acts as a variant of [`Subject`](https://jsr.io/@xan/subject/doc/~/Subject).
 */
export type BehaviorSubject<Value = unknown> = Subject<Value>;

// The main reason this JSDoc exists, is to satisfy the JSR score. In reality,
// the JSDoc on the above type is enough for the DX on both symbols.
/**
 * @class
 */
export const BehaviorSubject: BehaviorSubjectConstructor = class<Value> {
  readonly [Symbol.toStringTag] = "BehaviorSubject"; // Use a string literal so it does not get minified.
  readonly #subject = new ReplaySubject<Value>(1);
  readonly signal = this.#subject.signal;

  constructor(value: Value) {
    if (arguments.length === 0) {
      throw new TypeError("1 argument required but 0 present");
    }
    Object.freeze(this);
    this.#subject.next(value);
  }

  next(value: Value): void {
    if (this instanceof BehaviorSubject) this.#subject.next(value);
    else throw new TypeError("'this' is not instanceof 'BehaviorSubject'");
  }

  return(): void {
    if (this instanceof BehaviorSubject) this.#subject.return();
    else throw new TypeError("'this' is not instanceof 'BehaviorSubject'");
  }

  throw(value: unknown): void {
    if (this instanceof BehaviorSubject) this.#subject.throw(value);
    else throw new TypeError("'this' is not instanceof 'BehaviorSubject'");
  }

  subscribe(observer: Observer<Value>): void {
    if (!(this instanceof BehaviorSubject)) {
      throw new TypeError("'this' is not instanceof 'BehaviorSubject'");
    }
    if (arguments.length === 0) {
      throw new TypeError("1 argument required but 0 present");
    }
    if (!isObserver(observer)) {
      throw new TypeError("Parameter 1 is not of type 'Observer'");
    }
    this.#subject.subscribe(observer);
  }
};

Object.freeze(BehaviorSubject);
Object.freeze(BehaviorSubject.prototype);
