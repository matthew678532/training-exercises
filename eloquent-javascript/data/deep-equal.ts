// https://eloquentjavascript.net/04_data.html#i-IJBU+aXOIC

const deepEqual = (a: any, b: any) => {
  if ((typeof a !== 'object' || typeof a === null) || (typeof b !== 'object' || typeof b === null)) {
    return a === b;
  }

  const keys = Object.keys(a);

  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  let nextA: any = {};
  let nextB: any = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (Object.keys(b).indexOf(key) === -1) {
      return false;
    }

    if ((typeof a[key] !== 'object' || typeof a[key] === null) || (typeof b[key] !== 'object' || typeof b[key] === null)) {
      if (a[key] !== b[key]) {
        return false;
      } else {
        continue;
      }
    }

    Object.assign(nextA, a[key]);
    Object.assign(nextB, b[key]);
  }

  if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
    return true;
  } else {
    return deepEqual(nextA, nextB);
  }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
