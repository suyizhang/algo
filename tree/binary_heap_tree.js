// // 树的数组表示
// a[i] 的左子节点为 a[i*2], 右子节点为 a[i*2+1], 父节点为 a[i/2]

// Node:
// 	arr
// 	idx

// 	data = { key: ?, value: ? }

// 	getParent() -> Node
// 	getLeft() -> Node
// 	getRight() -> Node

// Node arr[]

// 二叉堆是一个完全二叉树 (高度 log(N))

// 任一节点的 key <= 子节点的 key
// 	m 层节点的 key <= m + 1 层节点的 key

// BinaryHeap:
// 	add(x) // log(N)
// 		将 x 放在数组末尾
// 		"上滤"
// 	min() -> x
// 	removeMin() -> x // log(N)
// 		将根节点替换为数组末尾的节点
// 		"下滤"

// 通过 add(x) 构建 BinaryHeap 的复杂度: N * log(N)

// build_heap() // 复杂度 N
// 	从倒数第二层开始逐层 "下滤"

class Node {
  constructor(data) {
    this.data = data;

    this.arr = null;
    this.idx = 0;
  }

  getParent() {
    this.inTree();
    if (this.isRoot()) return null;

    const parentIdx = Math.floor(this.idx / 2);
    return this.arr[parentIdx];
  }

  getLeft() {
    this.inTree();
    const leftIdx = this.idx * 2;
    if (this.arr.length <= leftIdx) {
      return null;
    }
    return this.arr[leftIdx];
  }

  getRight() {
    this.inTree();
    const rightIdx = this.idx * 2 + 1;
    if (this.arr.length <= rightIdx) {
      return null;
    }
    return this.arr[rightIdx];
  }

  /** 上滤 */
  _percolate_up() {
    this.inTree();
    const parent = this.getParent();
    if (!parent) return;

    if (parent.data.key > this.data.key) {
      this.swapIdx(parent);
      this._percolate_up();
    }
  }

  _percolate_down() {
    const left = this.getLeft();
    const right = this.getRight();

    if (!left && !right) return;

    if (!right) {
      if (left.data.key < this.data.key) {
        this.swapIdx(left);
        this._percolate_down();
      }
      return;
    }

    if (!left) {
      if (right.data.key < this.data.key) {
        this.swapIdx(right);
        this._percolate_down();
      }
      return;
    }

    if (left.data.key < right.data.key) {
      if (left.data.key < this.data.key) {
        this.swapIdx(left);
        this._percolate_down();
      }
    } else {
      if (right.data.key < this.data.key) {
        this.swapIdx(right);
        this._percolate_down();
      }
    }
  }

  // 交换节点位置
  swapIdx(other) {
    other.inTree();
    this.inTree();
    [this.idx, other.idx] = [other.idx, this.idx];
    this.arr[this.idx] = this;
    this.arr[other.idx] = other;
  }

  inTree() {
    if (this.idx === 0) {
      throw new Error("节点不在树上");
    }
  }

  isRoot() {
    return this.idx === 1;
  }
}

class BinaryHeap {
  constructor() {
    // 存放节点的数组
    this.arr = [null];
  }

  // logn
  add(key) {
    const node = new Node({ key });
    node.idx = this.arr.length;
    node.arr = this.arr;
    this.arr.push(node);
    node._percolate_up();
  }

  min() {
    if (this.isEmpty()) return null;
    return this.getRoot();
  }

  // 堆中节点个数
  size() {
    return this.arr.length - 1;
  }

  getRoot() {
    if (this.isEmpty()) return null;
    return this.arr[1];
  }

  //logn
  removeMin() {
    if (this.isEmpty()) return null;

    const res = this.getRoot();

    if (this.size() > 1) {
      res.swapIdx(this.arr[this.arr.length - 1]);
    }

    // 删除节点
    this.arr.pop();
    res.idx = 0;

    if (this.size() > 1) {
      this.getRoot()._percolate_down();
    }

    return res;
  }

  isEmpty() {
    return this.arr.length === 1;
  }
}

// nlogn
function build_heap_naive(arr) {
  const heap = new BinaryHeap();
  for (let i = 0; i < arr.length; i++) {
    heap.add(arr[i]);
  }

  return heap;
}

function test_heap(heap) {
  while (!heap.isEmpty()) {
    console.log(heap.removeMin().data.key);
  }
}

// n
function build_heap(arr) {
  const heap = new BinaryHeap();
  for (let i = 0; i <arr.length; i++) {
    heap.arr.push(new Node({key: arr[i]}));
  }

  if (arr.length > 2) {
    const halfIdx = Math.floor((heap.arr.length - 1) / 2);
    for (i = halfIdx; i > 0; i--) {
      heap.arr[i]._percolate_down();
    }
  }

  return heap;
}

function test() {
  const heap = build_heap_naive([1, 4, 6, 7, 2, 3, 8, 3, 5, 10, 1]);
  test_heap(heap);
}

test();
