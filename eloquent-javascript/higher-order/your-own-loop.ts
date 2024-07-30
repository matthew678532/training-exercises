// https://eloquentjavascript.net/05_higher_order.html#i-gKQ1S54F4o

type TestFunction = (n: number) => boolean;
type UpdateFunction = (n: number) => number;
type BodyFunction = (n: number) => void;

const loop = (value: number, testFunction: TestFunction, updateFunction: UpdateFunction, bodyFunction: BodyFunction) => {
  while (testFunction(value)) {
    bodyFunction(value);
    value = updateFunction(value);
  }
}

loop(3, n => n > 0, n => n - 1, console.log);