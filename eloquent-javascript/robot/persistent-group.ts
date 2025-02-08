// https://eloquentjavascript.net/07_robot.html#i-s+ntyh5xrm

class PGroup {
  #members: Array<unknown>;
  constructor(members: Array<unknown>) {
    this.#members = members;
  }

  add(value: unknown) {
    if (this.has(value)) {
      return this;
    }
    return new PGroup(this.#members.concat([value]));
  }

  delete(value: unknown) {
    if (!this.has(value)) {
      return this;
    }
    return new PGroup(this.#members.filter(m => m !== value));
  }

  has(value: unknown) {
    return this.#members.includes(value);
  }

  static empty = new PGroup([]);

  getMembers() {
    return this.#members;
  }
}

let a = PGroup.empty.add("a");
console.log(a.getMembers());
let ab = a.add("b");
console.log(ab.getMembers());
let b = ab.delete("a");
console.log(b.getMembers());

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false