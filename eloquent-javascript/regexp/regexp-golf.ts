// https://eloquentjavascript.net/09_regexp.html#i-vDM8PzwQWU

// 1. Match on car and cat
verify(/ca(r|t)/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

// 2. Match on pop and prop
verify(/pr?op/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

// 3. Match on ferret, ferry, and ferrari
verify(/ferr(et|y|ari)/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

// 4. Match on any word ending in ious
verify(/ious(\s|$)/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

// 5. Match on a whitespace character followed by a period, comma, colon, or semicolon
verify(/\s(\.|,|:|;)/,
  ["bad punctuation ."],
  ["escape the period"]);

// 6. Match on a word longer than six letters
verify(/[a-zA-Z]{7,}/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]);

// 7. Match on a word without the letter e (or E)
verify(/.../,
  ["red platypus", "wobbling nest"],
  ["earth bed", "bedrøvet abe", "BEET"]);

function verify(regexp: RegExp, yes: string[], no: string[]): void {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}