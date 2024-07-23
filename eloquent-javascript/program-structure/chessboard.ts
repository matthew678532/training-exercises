// https://eloquentjavascript.net/02_program_structure.html#i-swb9JBtSQQ
const size = 8;

for (let i = 0; i < size; i++) {
  let line = '';

  for (let j = 0; j < size; j++) {
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        line += '#';
      } else {
        line += ' ';
      }
    } else {
      if (j % 2 === 0) {
        line += ' ';
      } else {
        line += '#';
      }
    }
  }

  console.log(line);
}