// https://eloquentjavascript.net/04_data.html#i-8ZspxiCEC/

const range = (a: number, b: number, step: number = 1) => {
  const output: number[] = [];
  step = a > b ? -1 : step;

  if (a < b) {
    for (let i = a; i <= b; i += step) {
      output.push(i);
    }
  } else {
    for (let i = a; i >= b; i += step) {
      output.push(i);
    }
  }

  return output;
}

const sum = (numbers: number[]) => {
  let count = 0;

  for (let number of numbers) {
    count += number;
  }

  return count;
}

console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(range(5, 2));
console.log(sum(range(1, 10)));