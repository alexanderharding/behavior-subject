import type { BehaviorSubject } from "./behavior-subject.ts";

/**
 * Object interface for an {@linkcode BehaviorSubject} factory.
 */
export interface BehaviorSubjectConstructor {
  new <Value>(value: Value): BehaviorSubject<Value>;
  readonly prototype: BehaviorSubject;
}
