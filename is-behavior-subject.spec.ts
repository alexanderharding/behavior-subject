import { isBehaviorSubject } from "./is-behavior-subject.ts";
import { assertEquals } from "@std/assert";
import { BehaviorSubject } from "./behavior-subject.ts";

Deno.test(
  "isBehaviorSubject should return true if the value is an instance of BehaviorSubject",
  () => {
    // Arrange
    const behaviorSubject = new BehaviorSubject(Math.random());

    // Act
    const result = isBehaviorSubject(behaviorSubject);

    // Assert
    assertEquals(result, true);
  },
);

Deno.test(
  "isBehaviorSubject should return true if the value is a custom BehaviorSubject",
  () => {
    // Arrange
    const behaviorSubject: BehaviorSubject<number> = {
      value: Math.random(),
      subscribe: () => {},
      signal: new AbortController().signal,
      next: () => {},
      return: () => {},
      throw: () => {},
    };

    // Act
    const result = isBehaviorSubject(behaviorSubject);

    // Assert
    assertEquals(result, true);
  },
);

Deno.test(
  "isBehaviorSubject should return false if the value is an empty object",
  () => {
    // Arrange
    const value = {};

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test("isBehaviorSubject should return false if the value is null", () => {
  // Arrange
  const value = null;

  // Act
  const result = isBehaviorSubject(value);

  // Assert
  assertEquals(result, false);
});

Deno.test(
  "isBehaviorSubject should return false if the value is undefined",
  () => {
    // Arrange
    const value = undefined;

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test(
  "isBehaviorSubject should return false if 'subscribe' is not a function",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject, "subscribe">
      & Record<"subscribe", "not a function"> = {
        value: Math.random(),
        subscribe: "not a function",
        signal: new AbortController().signal,
        next: () => {},
        return: () => {},
        throw: () => {},
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test(
  "isBehaviorSubject should return false if 'signal' is not an instance of AbortSignal",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject, "signal">
      & Record<"signal", "not an AbortSignal"> = {
        value: Math.random(),
        subscribe: () => {},
        signal: "not an AbortSignal",
        next: () => {},
        return: () => {},
        throw: () => {},
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test("isBehaviorSubject should return false if 'value' is missing", () => {
  // Arrange
  const value: Omit<BehaviorSubject<number>, "value"> = {
    subscribe: () => {},
    signal: new AbortController().signal,
    next: () => {},
    return: () => {},
    throw: () => {},
  };

  // Act
  const result = isBehaviorSubject(value);

  // Assert
  assertEquals(result, false);
});

Deno.test(
  "isBehaviorSubject should return false if 'next' is not a function",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject<number>, "next">
      & Record<"next", "not a function"> = {
        value: Math.random(),
        subscribe: () => {},
        signal: new AbortController().signal,
        next: "not a function",
        return: () => {},
        throw: () => {},
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test(
  "isBehaviorSubject should return false if 'return' is not a function",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject<number>, "return">
      & Record<"return", "not a function"> = {
        value: Math.random(),
        subscribe: () => {},
        signal: new AbortController().signal,
        next: () => {},
        return: "not a function",
        throw: () => {},
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test(
  "isBehaviorSubject should return false if 'throw' is not a function",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject<number>, "throw">
      & Record<"throw", "not a function"> = {
        value: Math.random(),
        subscribe: () => {},
        signal: new AbortController().signal,
        next: () => {},
        return: () => {},
        throw: "not a function",
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);

Deno.test(
  "isBehaviorSubject should return false if 'signal' is not an instance of AbortSignal",
  () => {
    // Arrange
    const value:
      & Omit<BehaviorSubject<number>, "signal">
      & Record<"signal", "not an AbortSignal"> = {
        value: Math.random(),
        subscribe: () => {},
        signal: "not an AbortSignal",
        next: () => {},
        return: () => {},
        throw: () => {},
      };

    // Act
    const result = isBehaviorSubject(value);

    // Assert
    assertEquals(result, false);
  },
);
