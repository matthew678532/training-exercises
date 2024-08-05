// https://eloquentjavascript.net/06_object.html#i-rpYp9Ou4LG

class Group {
  grp: any[];

  constructor() {
    this.grp = [];
  }

  add(value: any) {
    if (this.grp.indexOf(value) === -1) {
      this.grp.push(value);
    }
  }

  delete(value: any) {
    const index = this.grp.indexOf(value);

    if (index !== -1) {
      this.grp.splice(index, 1);
    }
  }

  has(value: any) {
    return this.grp.indexOf(value) !== -1;
  }

  static from(values: any[]) {
    const grp = new Group();

    for (let value of values) {
      grp.add(value);
    }

    return grp;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

module.exports = Group;