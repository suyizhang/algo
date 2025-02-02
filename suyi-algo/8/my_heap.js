class MpHeap {
  constructor(nums) {
    // 堆化除叶节点以外的其他所有节点
    this.maxHeap = nums === undefined ? []: [...nums];
     // 堆化除叶节点以外的其他所有节点
     for (let i = this.parent(this.size() - 1); i >= 0; i--) {
      this.siftDown(i);
  }
  }

  /* 获取左子节点的索引 */
  left(i) {
    return 2 * i + 1;
  }

  /* 获取右子节点的索引 */
  right(i) {
    return 2 * i + 2;
  }

  /* 获取父节点的索引 */
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  /* 访问堆顶元素 */
  peek() {
    return this.maxHeap[0];
  }

  /** 元素入堆 */
  push(val) {
    this.maxHeap.push(val);
    // 从底至顶堆化
    this.siftUp(this.size() - 1);
  }

  swap(i, p) {
    [this.maxHeap[i], this.maxHeap[p]] = [this.maxHeap[p], this.maxHeap[i]];
  }

  /** 从节点 i 开始 从底至顶堆化 */
  siftUp(i) {
    while (true) {
      // 获取节点 i 的父节点
      const p = this.parent(i);
      // 当“越过根节点”或“节点无须修复”时，结束堆化
      if (p < 0 || this.maxHeap[i] <= this.maxHeap[p]) break;
      // 交换两节点
      this.swap(i, p);
      // 循环向上堆化
      i = p;
    }
  }

  /** 元素出堆 */
  pop() {
    if (this.isEmpty()) throw new Error("堆为空");
    // 交换根节点与最右叶节点（交换首元素与尾元素）
    this.swap(0, this.size() - 1);
    // 删除节点
    const val = this.maxHeap.pop();
    // 从顶至底堆化
    this.siftDown(0);
    // 返回堆顶元素
    return val;
  }

  /* 从节点 i 开始，从顶至底堆化 */
  siftDown(i) {
    while (true) {
      // 判断节点 i, l, r 中值最大的节点，记为 ma
      const l = this.left;
      r = this.right;
      let ma = i;
      if (l < this.zie() && this.maxHeap[l] > this.maxHeap[ma]) ma = l;
      if (r < this.zie() && this.maxHeap[r] > this.maxHeap[ma]) ma = r;
      // 若节点 i 最大或索引 l, r 越界，则无须继续堆化，跳出
      if (ma === i) break;
      // 交换两节点
      this.swap(i, ma);
      // 循环向下堆化
      i = ma;
    }
  }
}
