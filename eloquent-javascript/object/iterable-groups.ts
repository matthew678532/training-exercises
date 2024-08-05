// https://eloquentjavascript.net/06_object.html#i-djD3XDJ27V

const Group = require('./groups');

class GroupIterator {
  grp: any[];
  index: 0;

  constructor(group: any) {
    this.grp = group;
    this.index = 0;
  }

  next() {
    if (this.index >= this.grp.length) {
      return { done: true };
    }

    let value = this.grp[this.index];
    this.index++;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this.grp);
}

const grp = Group.from(["a", "b", "c"]);

for (let value of grp) {
  console.log("Loop one: ", value);
}

for (let value of grp) {
  console.log("Loop two: ", value);
}