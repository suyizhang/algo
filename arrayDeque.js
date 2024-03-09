// 双端队列

// ArrayDeque:
//   new(max_size)
//     data = []
   
//   pushFront(x)
//   popFront() -> x
//   front() -> x
//   pushBack()
//   popBack() -> x
//   back() -> x

//  []

class ArrayDeque {
  constructor(max_size) {
    if(max_size === undefined) {
      throw new Error('max_size 不能为空');
    }
    
    this.size = max_size + 1;
    this.data = [];
    this.head = 0;
    this.tail = 0;

  }

  pushFront(x) {
    if(this._isFull()) {
      throw new Error('queue is full');
    }
    this.head = (this.head - 1 + this.size) % this.size;
    this.data[this.head] = x;
  }

  popFront() {
    if(this._isEmpty()) {
      throw new Error('queue is empty');
    }
    const data = this.data[this.head];
    this.head = (this.head + 1) % this.size;
    return data;
  }

  front() {
    if (this._isEmpty()) {
      throw new Error(" queue is empty ");
    }
    return this.data[this.head];
  }

  pushBack(x) {
    if(this._isFull()) {
      throw new Error('queue is full');
    }
    this.data[this.tail] = x;
    this.tail = (this.tail + 1) % this.size;
  }

  popBack() {
    if(this._isEmpty()) {
      throw new Error('queue is empty');
    }
    const nextTail = (this.tail - 1 + this.size) % this.size;
    const data = this.data[nextTail];
    this.tail = nextTail;
    return data;
  }


  back() {
    if(this._isEmpty()) {
      throw new Error('queue is empty');
    }
    return this.data[(this.tail - 1 + this.size) % this.size];
  }


  _isEmpty() {
    return this.head === this.tail;
  }

  _isFull() {
    return this.head === (this.tail + 1) % this.size;
  }

  _print() {
    let p = this.head;
    const a = [];
    while(p !== this.tail) {
      a.push(this.data[p]);
      p = (p + 1) % this.size;
    }
    console.log( '['+ a.toString()+ ']');
  }
}

const n = 8;
const a = new ArrayDeque(n);


for(let i = 0; i < n; i += 2) {
  a.pushFront(i);
  a.pushBack(i + 1);
}

a._print();

for(let i = 0; i < n; i += 2) {
  a.popFront();
  a.popBack();
  a._print();
}

