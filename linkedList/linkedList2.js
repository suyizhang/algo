/**
 * 单向链表
 * dummy 编码为 -1 占位 无需处理链表为空的时候
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  insertAfter(node) {
    node.next = this.next;
    this.next = node;
  }

  removeAfter() {
    const node = this.next;
    if (node) {
      this.next = node.next;
      node.next = null;
    }
  }
}

class LinkedList {
  constructor() {
    const dummy = new Node();
    this.head = dummy;
    this.size = 0;
  }

  append(value) {
    this.insert(this.size, value);
  }

  insert(i, value) {
    if (this.size < i || i < 0) {
      throw new RangeError('out of range');
    }
    const node = new Node(value);

    const p = this._getNode(i - 1);
    p.insertAfter(node);

    this.size += 1;
  }

  prepend(value) {
    this.insert(0, value);
  }

  remove(i) {
    if (this.size - 1 < i || i < 0) {
      throw new RangeError('out of range');
    }
   
    const p = this._getNode(i - 1);
    p.removeAfter();
    this.size -= 1;
  }

  // 获取节点 i
  _getNode(i) {
    let p = this.head;
    for (let j = -1; j < i; j++) {
      p = p.next;
    }
    return p;
  }

  get(i) {
    if (i > this.size - 1 || i < 0) {
      throw new RangeError('out of range');
    }

    return this._getNode(i).data;
  }

  set(i, value) {
    if (i > this.size - 1 || i < 0) {
      throw new RangeError('out of range');
    }

    const node = this._getNode(i);
    node.data = value;
  }

  _print() {
    const arr = [];
    let p = this.head;
    while(p.next) {
      p = p.next;
      arr.push(p.data);
    }
    console.log(`[ ${arr.join(', ')} ]`);
  }
}

let a = new LinkedList();
a.append(1);
a.append(2);
a.append(3);
a.insert(2, 4);
a.prepend(0);
console.log(a.size);
a._print();
a.remove(0);
a._print();

// for (let i = 0; i < a.size; i++) {
//   console.log(a.get(i));
// }

// for (let i = 0; i < a.size; i++) {
//   a.set(i, i * i);
// }

// a._print();

