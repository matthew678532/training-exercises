// https://eloquentjavascript.net/03_functions.html#i-jxl1p970Fy

const isEven = (n: number) => {
  const abs = Math.abs(n);

  if (abs === 0) {
    return true;
  }

  if (abs === 1) {
    return false;
  }

  return isEven(abs - 2);
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));