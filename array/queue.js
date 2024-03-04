// 队列 先进先出 FIFO
// [1, 2, 3] 1 队首  3 队尾
// 入列从队尾添加元素  出列移除队首元素

class Queue {

  constructor(max_size) {
    if (max_size === undefined) {
      throw new Error('max_size 不能为空');
    }
    this.max_size = max_size;
    this.data = [];

    for (let i =0; i < max_size; i++) {
      this.data[i] = 0;
    }
  }

  // 入列
  enqueue(x) {
    if (this.data.length < this.max_size) {
      this.data.push(x);
    }
  }

  // 出列
  dequeue() {
    if (!this.data.length) {
      throw new Error(' queue is empty ');
    }
    return this.data.shift();
  }

  // 返回队首元素
  front() {
    if (!this.data.length) {
      throw new Error(' queue is empty ');
    }
    return this.data[0];
  }
}