// https://eloquentjavascript.net/05_higher_order.html#i-SmbRSAd5GA

function everyLoop(array: number[], test: (n: number) => boolean) {
  for (let entry of array) {
    if (!test(entry)) {
      return false;
    }
  }

  return true;
}

function everySome(array: number[], test: (n: number) => boolean) {
  return !array.some(n => !test(n));
}

console.log(everyLoop([1, 3, 5], n => n < 10));
console.log(everyLoop([2, 4, 16], n => n < 10));
console.log(everyLoop([], n => n < 10));

console.log(everySome([1, 3, 5], n => n < 10));
console.log(everySome([2, 4, 16], n => n < 10));
console.log(everySome([], n => n < 10));