// https://eloquentjavascript.net/03_functions.html#i-3rsiDgC2do

const countChars = (s: string, c: string) => {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (c === s[i]) {
      count++;
    }
  }

  return count;
}

const countBs = (s: string) => {
  return countChars(s, "B");
}

console.log(countBs('BOB'));
console.log(countChars('kakkerlak', 'K'));