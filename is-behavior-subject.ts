import { isSubject } from "@xan/subject";
import { BehaviorSubject } from "./behavior-subject.ts";

/**
 * Checks if a {@linkcode value} is an object that implements the {@linkcode BehaviorSubject} interface.
 */
export function isBehaviorSubject(value: unknown): value is BehaviorSubject {
  if (arguments.length === 0) {
    throw new TypeError("1 argument required but 0 present");
  }
  return (
    value instanceof BehaviorSubject || (isSubject(value) && "value" in value)
  );
}
