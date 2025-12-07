import { BehaviorSubject } from "./behavior-subject.ts";
import { Observable } from "@xan/observable";
import { Observer } from "@xan/observer";
import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";

Deno.test("BehaviorSubject.value should return current value", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");

  // Act
  const { value: value1 } = subject;
  subject.next("second");
  const { value: value2 } = subject;

  // Assert
  assertStrictEquals(value1, "initial");
  assertStrictEquals(value2, "second");
});

Deno.test("BehaviorSubject.value should not change after throw", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");
  subject.subscribe(new Observer({ throw: () => {} })); // Silence the error

  // Act
  const { value: value1 } = subject;
  subject.throw(new Error("test error"));
  subject.next("second");
  const { value: value2 } = subject;

  // Assert
  assertStrictEquals(value1, "initial");
  assertStrictEquals(value2, "initial");
});

Deno.test("BehaviorSubject.value should not change after return", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");

  // Act
  const { value: value1 } = subject;
  subject.return();
  subject.next("second");
  const { value: value2 } = subject;

  // Assert
  assertStrictEquals(value1, "initial");
  assertStrictEquals(value2, "initial");
});

Deno.test(
  "BehaviorSubject.constructor should not throw when creating with more than one argument",
  () => {
    // Arrange / Act / Assert
    new BehaviorSubject(
      ...([1, 2] as unknown as ConstructorParameters<typeof BehaviorSubject>),
    );
  },
);

Deno.test(
  "BehaviorSubject.constructor should throw when creating with no arguments",
  () => {
    // Arrange / Act / Assert
    assertThrows(
      () =>
        new BehaviorSubject(
          ...([] as unknown as ConstructorParameters<typeof BehaviorSubject>),
        ),
      TypeError,
      "1 argument required but 0 present",
    );
  },
);

Deno.test("BehaviorSubject should be created with an initial value", () => {
  // Arrange
  const value = Symbol("BehaviorSubject initial value");
  const subject = new BehaviorSubject(value);
  const notifications: Array<["N", unknown] | ["R"] | ["T", unknown]> = [];

  // Act
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Assert
  assertEquals(notifications, [["N", value]]);
});

Deno.test(
  "BehaviorSubject.subscribe should emit latest value to subscribers",
  () => {
    // Arrange
    const subject = new BehaviorSubject("initial");
    const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];
    subject.next("second");

    // Act
    subject.subscribe(
      new Observer({
        next: (value) => notifications.push(["N", value]),
        return: () => notifications.push(["R"]),
        throw: (value) => notifications.push(["T", value]),
      }),
    );

    // Assert
    assertEquals(notifications, [["N", "second"]]);
  },
);

Deno.test("BehaviorSubject.next should emit value to subscribers", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");
  const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Act
  subject.next("foo");

  // Assert
  assertEquals(notifications, [
    ["N", "initial"],
    ["N", "foo"],
  ]);
});

Deno.test(
  "BehaviorSubject.next should store value for late subscribers",
  () => {
    // Arrange
    const subject = new BehaviorSubject("initial");
    const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];

    // Act
    subject.next("foo");
    subject.subscribe(
      new Observer({
        next: (value) => notifications.push(["N", value]),
        return: () => notifications.push(["R"]),
        throw: (value) => notifications.push(["T", value]),
      }),
    );

    // Assert
    assertEquals(notifications, [["N", "foo"]]);
  },
);

Deno.test("BehaviorSubject.throw should pass through this subject", () => {
  // Arrange
  const error = new Error("test error");
  const subject = new BehaviorSubject("initial");
  const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Act
  subject.throw(error);

  // Assert
  assertEquals(notifications, [
    ["N", "initial"],
    ["T", error],
  ]);
});

Deno.test("BehaviorSubject.throw should notify late subscribers", () => {
  // Arrange
  const error = new Error("test error");
  const subject = new BehaviorSubject("initial");
  const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];
  subject.subscribe(new Observer({ throw: () => {} }));

  // Act
  subject.throw(error);
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Assert
  assertEquals(notifications, [
    ["N", "initial"],
    ["T", error],
  ]);
});

Deno.test("BehaviorSubject.return should pass through this subject", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");
  const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Act
  subject.return();

  // Assert
  assertEquals(notifications, [["N", "initial"], ["R"]]);
});

Deno.test("BehaviorSubject.return should notify late subscribers", () => {
  // Arrange
  const subject = new BehaviorSubject("initial");
  const notifications: Array<["N", string] | ["R"] | ["T", unknown]> = [];

  // Act
  subject.return();
  subject.subscribe(
    new Observer({
      next: (value) => notifications.push(["N", value]),
      return: () => notifications.push(["R"]),
      throw: (value) => notifications.push(["T", value]),
    }),
  );

  // Assert
  assertEquals(notifications, [["N", "initial"], ["R"]]);
});

Deno.test(
  "BehaviorSubject should be an Observer which can be given to Observable.subscribe",
  () => {
    // Arrange
    const source = new Observable<number>((observer) => {
      [1, 2, 3, 4, 5].forEach((value) => observer.next(value));
      observer.return();
    });
    const subject = new BehaviorSubject(0);
    const notifications: Array<["N", number] | ["R"] | ["T", unknown]> = [];

    // Act
    subject.subscribe(
      new Observer({
        next: (value) => notifications.push(["N", value]),
        return: () => notifications.push(["R"]),
        throw: (value) => notifications.push(["T", value]),
      }),
    );
    source.subscribe(subject);

    // Assert
    assertEquals(notifications, [
      ["N", 0],
      ["N", 1],
      ["N", 2],
      ["N", 3],
      ["N", 4],
      ["N", 5],
      ["R"],
    ]);
  },
);

Deno.test(
  "Subject should enforce the correct 'this' binding when calling instance methods",
  () => {
    // Arrange
    const subject = new BehaviorSubject(2);

    assertThrows(
      () => BehaviorSubject.prototype.value,
      TypeError,
      "'this' is not instanceof 'BehaviorSubject'",
    );

    assertThrows(
      () => subject.next.call(null, 1),
      TypeError,
      "'this' is not instanceof 'BehaviorSubject'",
    );
    assertThrows(
      () => subject.return.call(null),
      TypeError,
      "'this' is not instanceof 'BehaviorSubject'",
    );
    assertThrows(
      () => subject.throw.call(null, new Error("test")),
      TypeError,
      "'this' is not instanceof 'BehaviorSubject'",
    );
    assertThrows(
      () => subject.subscribe.call(null, new Observer()),
      TypeError,
      "'this' is not instanceof 'BehaviorSubject'",
    );
  },
);
