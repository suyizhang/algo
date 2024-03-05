// 队列 先进先出 FIFO
// [1, 2, 3] 1 队首  3 队尾
// 入列从队尾添加元素  出列移除队首元素

class Queue {
  // max_size 队列最多容纳元素的个数
  constructor(max_size) {
    if (max_size === undefined) {
      throw new Error("max_size 不能为空");
    }
    // 数组大小 + 1 为tail位置
    this.size = max_size + 1;
    this.data = [];
    // 队首 数据第一位
    this.head = 0;
    // 队尾 队尾位置为数据最后一个的下一个位置  不是数据的最后一位
    this.tail = 0;
  }

  // [1, 2, 3]
  // head 0 tail 3
  
  // headtatil:  00 01 02 03 
  // 入列
  enqueue(x) {
    if (this._isFull()) {
      throw new Error("队列已满，无法入列");
    }
    this.data[this.tail] = x;
    this.tail = (this.tail + 1) % this.size;
    this._print();
  }

  // 出列
  dequeue() {
    if (this._isEmpty()) {
      throw new Error(" queue is empty ");
    }
    const data = this.data[this.head];
    this.head = (this.head + 1) % this.size;
    this._print();
    return data;
  }

  // 返回队首元素
  front() {
    if (this._isEmpty()) {
      throw new Error(" queue is empty ");
    }
    const data = this.data[this.head];
    return data;
  }
  _isEmpty() {
    return this.head === this.tail;
  }

  _isFull() {
    return this.head === (this.tail + 1) % this.size;
  }
  _print() {
    let p = this.head;
    let a = '';
    while(p !== this.tail) {
      a += this.data[p] + '-';
      p = (p + 1) % this.size;
    }
    console.log(a);
  }
  // _print() {
  //   let a = '';
  //   const total = (this.tail - this.head + this.size) % this.size;
  //   let current = this.head;
  //   for (let i = 0; i < total; i++) {
  //     a += this.data[current] + '、';
  //     current = (current + 1) % this.size;
  //   }

  //   console.log(a);
  // }
}

const a = new Queue(3);

for(let i = 0; i< 3; i++) {
  a.enqueue(i);
}

// for(let i = 0; i< 10; i++) {
//   a.dequeue();
// }