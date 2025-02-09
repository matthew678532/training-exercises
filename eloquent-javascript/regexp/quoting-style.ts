// https://eloquentjavascript.net/09_regexp.html#i-dTiEW14oG0

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
// → "I'm the cook," he said, "it's my job."

// How to find:
// 1. Target ' usage that's preceeded and followed by letters
// 2. Invert this