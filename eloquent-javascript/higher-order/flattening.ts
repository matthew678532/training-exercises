// https://eloquentjavascript.net/05_higher_order.html#i-aIOczlLyX1

let arrays: number[][] = [[1, 2, 3], [4, 5], [6]];

const reduced = arrays.reduce((a: number[], b: number[]) => a.concat(b));

console.log(reduced);