/**
 * 双向链表
 * 
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  insertAfter(node) {
    node.prev = this;
    node.next = this.next;

    if (this.next) {
      this.next.prev = node;
    }

    this.next = node;
  }

  insertBefore(node) {
    node.next = this;
    node.prev = this.prev;

    if (this.prev) {
      this.prev.next = node;
    }

    // 最后修改this 更安全
    this.prev = node;
  }

  remove() {
    if (this.next) {
      this.next.prev = this.prev;
    }

    if (this.prev) {
      this.prev.next = this.next;
    }

    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  constructor() {
    const dummy = new Node();
    this.head = dummy;
    this.tail = dummy;
    this.size = 0;
  }

  append(value) {
    this.insert(this.size, value);
  }

  insert(i, value) {
    if (this.size < i || i < 0) {
      throw new RangeError("out of range");
    }
    const node = new Node(value);
    const p = this._getNode(i - 1);
    p.insertAfter(node);
    // node 为链表最后一个节点  将tail 指向node;
    if (!node.next) {
      this.tail = node;
    }

    this.size += 1;
  }

  prepend(value) {
    this.insert(0, value);
  }

  remove(i) {
    if (this.size - 1 < i || i < 0) {
      throw new RangeError('out of range');
    }
   
    const p = this._getNode(i);
    p.remove();
    
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
    while (p.next) {
      p = p.next;
      arr.push(p.data);
    }
    console.log(`[ ${arr.join(", ")} ]`);
  }
}

let a = new DoubleLinkedList();
a.append(1);
a.append(2);
a.append(3);
a.insert(2, 4);
a.prepend(0);
console.log(a.size);
a._print();
a.remove(0);
a._print();

console.log(a.head);
console.log(a.tail);