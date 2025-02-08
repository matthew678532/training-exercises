// https://eloquentjavascript.net/08_error.html#i-iGlwnUbkRs

const box = new class {
  locked = true;
  #content: Array<unknown> = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body: () => unknown): void {
  const wasUnlocked = !box.locked;

  try {
    box.unlock();
    body();
  } finally {
    if (!wasUnlocked) {
      box.lock();
    }
  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true