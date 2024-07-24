// https://eloquentjavascript.net/04_data.html#i-nSTX34CM1M

type List = {
  value?: number,
  rest?: List | null
} | null | undefined;

const arrayToList = (array: number[]) => {
  let list: List = {};

  for (let i = array.length - 1; i > -1; i--) {
    const value = array[i];
    list = { value, rest: Object.keys(list).length ? list : null };
  }

  return list;
}

const listToArray = (list: List) => {
  const array: number[] = [];

  for (let node = list; node; node = node?.rest || null) {
    if (node?.value) {
      array.push(node.value);
    }
  }

  return array;
}

const prepend = (element: number, list: List,) => {
  return { value: element, rest: list };
}

const nth = (list: List, number: number) => {
  return listToArray(list)[number] || undefined;
}

const nthRecursive = (list: List, number: number) => {
  if (list === undefined) {
    return undefined;
  }
  if (number === 0) {
    return list?.value;
  }

  return nthRecursive(list?.rest, number - 1);
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nthRecursive(arrayToList([10, 20, 30]), 4));