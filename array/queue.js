class Queue {
  constructor(max_size) {
    this.size = max_size;
    this.data = [];
  }

  enqueue() {
    if (this.data.length < this.max_size) {
      this.data.push(x);
    }
  }

  dequeue() {
    if (!this.data.length) {
      throw new Error(' queue is empty ');
    }
    return this.data.shift();
  }

  front() {
    if (!this.data.length) {
      throw new Error(' queue is empty ');
    }
    return this.data[0];
  }
 
}