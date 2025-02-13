/**
 * 大顶堆
 * 对于大顶堆（小顶堆），堆顶元素（根节点）的值是最大（最小）的。
 */
class Heap {
  constructor() {
    this.heap = [];
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val); // 添加节点
    this.shiftUp(this.size() - 1); // 从底至顶堆化
  }

  swap(i, p) {
    [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  /* 从节点 i 开始，从底至顶堆化 */
  shiftUp(i) {
    while (true) {
      const p = this.parent(i); // 获取节点 i 的父节点
      if (p < 0 || this.heap[i] <= this.heap[p]) {
        // 当“越过根节点”或“节点无须修复”时，结束堆化
        break;
      }
      this.swap(i, p); // 交换两节点
      i = p; // 循环向上堆化
    }
  }

  pop() {
    // 判空处理
    if (this.isEmpty()) {
      throw new Error("堆为空");
    }
    // 交换根节点与最右叶节点（交换首元素与尾元素）
    this.swap(this.size() - 1, 0);
    // 删除节点
    const val = this.heap.pop();
    // 从顶至底堆化
    this.siftDown(0);
    // 返回堆顶元素
    return val;
  }
  /* 从节点 i 开始，从顶至底堆化 */
  siftDown(i) {
    while (true) {
      // 判断节点 i, l, r 中值最大的节点，记为 d
      const l = this.left(i);
      const r = this.right(i);

      let d = i;

      if (l < this.size() && this.heap[d] < this.heap[l]) {
        d = l;
      }
      if (r < this.size() && this.heap[d] < this.heap[r]) {
        d = r;
      }
      // 若节点 i 最大或索引 l, r 越界，则无须继续堆化，跳出
      if (d === i) {
        break;
      }
      // 交换两节点
      this.swap(i, d);
      // 循环向下堆化
      i = d;
    }
  }

  console() {
    console.log(this.heap.toString());
  }
}

const heap = new Heap();

heap.push(1);
heap.push(32);
heap.push(34);
heap.push(3);
heap.push(31);
heap.console();
heap.pop();
heap.console();
