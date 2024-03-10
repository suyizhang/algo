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

  isEmpty() {
    return this.data.length === 0;
  }
}

function stack_test() {
  const b = new Stack();

  b.push(4);
  b.push(5);
  b.push(6);
  // b.pop();
  b.pop();
  console.log(b.data);
  console.log(b.top());
}

// stack_test();

module.exports = {Stack};

