/** 数组表示下的二叉树类 */

class ArrayBinaryTree {
  tree;

  constructor(arr) {
    this.tree = arr;
  }

  size() {
    return this.tree.length;
  }
  /* 获取索引为 i 节点的值 */
  val(i) {
    // 若索引越界，则返回 null ，代表空位
    if (i < 0 || i > this.size()) return null;
    return this.tree(i);
  }

  /* 获取索引为 i 节点的左子节点的索引 */
  left(i) {
    return 2 * i + 1;
  }

  /* 获取索引为 i 节点的右子节点的索引 */
  right(i) {
    return 2 * i + 2;
  }

  /* 获取索引为 i 节点的父节点的索引 */
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  /** 层序遍历 */
  levelOrder() {
    let res = [];
    for (let i = 0; i < this.size(); i++) {
      if (this.val(i) !== null) res.push(this.val(i));
    }
    return res;
  }

  /** 深度优先遍历 */
  dfs(i, order, res) {
    if (this.val(i) === null) return;
    if (order === "pre") res.push(this.val(i));
    this.dfs(this.left(i), order, res);
    // 中序遍历
    if (order === "in") res.push(this.val(i));
    this.dfs(this.right(i), order, res);
    // 后序遍历
    if (order === "post") res.push(this.val(i));
  }

  /* 前序遍历 */
  preOrder() {
    const res = [];
    this.dfs(0, "pre", res);
    return res;
  }

  /* 中序遍历 */
  inOrder() {
    const res = [];
    this.dfs(0, "in", res);
    return res;
  }

  /* 后序遍历 */
  postOrder() {
    const res = [];
    this.dfs(0, "post", res);
    return res;
  }
}

/**
 * 
 * 二叉树的数组表示主要有以下优点。

数组存储在连续的内存空间中，对缓存友好，访问与遍历速度较快。
不需要存储指针，比较节省空间。
允许随机访问节点。
然而，数组表示也存在一些局限性。

数组存储需要连续内存空间，因此不适合存储数据量过大的树。
增删节点需要通过数组插入与删除操作实现，效率较低。
当二叉树中存在大量 None 时，数组中包含的节点数据比重较低，空间利用率较低。
 */
