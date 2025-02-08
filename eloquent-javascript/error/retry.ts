// https://eloquentjavascript.net/08_error.html#i-n1zYouiAfX

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a: number, b: number): number {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a: number, b: number) {
  for(;;) {
    try {
      return primitiveMultiply(a, b);
    } catch(e: unknown) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.info("MultiplicatorUnitFailure instance.. retrying");
      } else {
        console.error(e);
        break;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64