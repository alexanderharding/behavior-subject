# @xan/behavior-subject

A set of tooling that encapsulates an object that acts as a variant of
[`Subject`](https://jsr.io/@xan/subject/doc/~/Subject) that keeps track of it's current value and
replays it to [`consumers`](https://jsr.io/@xan/observer#consumer) upon
[`subscription`](https://jsr.io/@xan/observable/doc/~/Observable.subscribe).

## Build

Automated by [JSR](https://jsr.io/).

## Publishing

Automated by `.github\workflows\publish.yml`.

## Running unit tests

Run `deno task test` or `deno task test:ci` to execute the unit tests via
[Deno](https://deno.land/).

## Example

```ts
import { BehaviorSubject } from "@xan/behavior-subject";

const subject = new BehaviorSubject(0);
const controller = new AbortController();

subject.subscribe({
  signal: controller.signal,
  next: (value) => console.log(value),
  return: () => console.log("return"),
  throw: () => console.error("error"),
});

// console output:
// 0

subject.next(1);

// console output:
// 1

subject.return();

// console output:
// return

subject.subscribe({
  signal: controller.signal,
  next: (value) => console.log(value),
  return: () => console.log("return"),
  throw: () => console.error("error"),
});

// console output:
// 1
// return
```

# Glossary And Semantics

- [@xan/observer](https://jsr.io/@xan/observer#glossary-and-semantics)
- [@xan/observable](https://jsr.io/@xan/observable#glossary-and-semantics)
- [@xan/subject](https://jsr.io/@xan/subject#glossary-and-semantics)
