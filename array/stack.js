// 栈 先进后出  FILO
class Stack {
  constructor() {
    this.data = [];
  }

  push(s) {
    this.data.push(s);
  }

  pop() {
    if (!this.data.length) {
      throw new Error('stack is empty');
    }
    const s = this.data.pop();
    return s;
  }

  top() {
    if (!this.data.length) {
      throw new Error('stack is empty');
    }
    return this.data[this.data.length - 1];
  }
}

const b = new Stack();

b.push(4);
console.log(b.data);
b.pop();
console.log(b.data);
console.log(b.top());
