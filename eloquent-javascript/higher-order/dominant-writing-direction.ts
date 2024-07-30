// https://eloquentjavascript.net/05_higher_order.html#i-4ccl4J1nOw

type Script = {
  name: string,
  ranges: number[][],
  direction: string,
  year: number,
  living: boolean,
  link: string
};

const SCRIPTS: Script[] = require('./libs/scripts');

function characterScript(code: number) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

type Count = {
  direction: string,
  count: number
};

function countBy(items: string, groupDirection: (c: string) => string) {
  let counts: Count[] = [];
  for (let item of items) {
    let direction = groupDirection(item);
    let known = counts.find(c => c.direction == direction);
    if (!known) {
      counts.push({direction, count: 1});
    } else {
      known.count++;
    }
  }
  return counts;
}

function dominantDirection(text: string) {
  let scripts = countBy(text, char => {
    let script = characterScript(char?.codePointAt(0) || 0);
    return script ? script.direction : "none";
  }).filter(({direction}) => direction != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({direction, count}) => {
    return `${Math.round(count * 100 / total)}% ${direction}`;
  }).join(", ");
}

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));