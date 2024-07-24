// https://eloquentjavascript.net/04_data.html#i-6xTmjj4Rf5

const reverseArray = (array: any[]) => {
  const output: string[] = [];

  for (let i = array.length - 1; i > -1; i--) {
    output.push(array[i]);
  }

  return output;
}

const reverseArrayInPlace = (array: any[]) => {
  const loopLength = Math.floor(array.length / 2);

  for (let i = 0; i < loopLength; i++) {
    const currentElement = array[i];
    const mirrorElement = array[array.length - 1 - i];

    array[i] = mirrorElement;
    array[array.length - 1 - i] = currentElement;
  }

  return array;
}

let myArray: string[] = ["A", "B", "C"];
console.log(reverseArray(myArray));
console.log(myArray);

let arrayValue: number[] = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);