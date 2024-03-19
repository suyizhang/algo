const { Node: TreeNode } = require("./binary_tree");

// 左子树所有节点的 key "小于" 当前节点的 key
// 右子树所有节点的 key "大于" 当前节点的 key
// Node:
// 	// key = ?; value = ?;
// 	// 或
// 	data = { key: ?, value: ? };

// 	insert(key, value) -> Node // 返回新创建的节点
// 	find(key) -> Node
// 	lowerBound(key) -> Node // 返回下界 (>= key 的第一个节点)
// 	upperBound(key) -> Node // 返回上界 ( > key 的第一个节点)

// 	_erase() -> Node // 将当前节点删除，返回子树的根节点
// 	remove(key) -> removed, Node // 根据 key 找到节点，并删除; 返回子树的根节点

// 	min() -> Node // 子树最小的节点
// 	max() -> Node // 子树最大的节点
// 	prev() -> None // 前一个节点
// 	next() -> Node // 后一个节点

// Tree:
// 	_root

// 	insert(key, value) -> Node
// 	remove(key) -> bool

class Node extends TreeNode {
  constructor(props) {
    super(props);
  }

  find(key) {
    if (key === this.data.key) {
      return this;
    }

    if (key < this.data.key) {
      if (!this.left) return null;
      return this.left.find(key);
    } else {
      if (!this.right) return null;
      return this.right.find(key);
    }
  }

  getRoot() {
    let node = this;
    while (node.parent) {
      node = node.parent;
    }
    return node;
  }

  insert(key, value) {
    if (key === this.data.key) {
      this.data.value = value;
      return this;
    }
    let newNode = null;
    if (key < this.data.key) {
      if (this.left) {
        newNode = this.left.insert(key, value);
      } else {
        newNode = new Node({ key, value });
        this.setLeft(newNode);
      }
    } else {
      if (this.right) {
        newNode = this.right.insert(key, value);
      } else {
        newNode = new Node({ key, value });
        this.setRight(newNode);
      }
    }
    this._rebalance();
    return newNode;
  }

  _balance_upward() {

    const arr = [];

    let p = this;
    while(p) {
      arr.push(p);
      p = p.parent;
    }

    arr.forEach(v => {
      v._balance();
    })
  }

  _balance() {

  }

  /** 返回子树根节点 */
  remove(key) {
    const node = this.find(key);
    if (!node) return [false, this];
    const node2 = node.erase();
    // 删除当前节点时  返回新的根节点
    if (node === this) {
      return [true, node2];
    }
    return [true, this];
  }

  /** 将当前节点删除 返回子树根节点 */
  _erase() {
    let new_root = null;
    if (!this.left && !this.right) {
    } else if (!this.left) {
      new_root = this.right;
    } else if (!this.right) {
      new_root = this.left;
    } else {
      let cur = this.right;
      while (cur.left) {
        cur = cur.left;
      }
      if (cur !== this.right) {
        cur.erase();
        cur.setRight(this.right);
      }
      cur.setLeft(this.left);
      new_root = cur;
    }

    if (this.parent) {
      if (this.parent.left === this) {
        this.parent.setLeft(new_root);
      } else {
        this.parent.setRight(new_root);
      }
    }

    this.parent = null;
    this.left = null;
    this.right = null;
    return new_root;
  }

  // 根据 key 找到节点，并删除；removed 表示删除是否发生；node 为子树的新根节点

  // 子树最小的节点
  min() {
    let cur = this;
    while (cur.left) {
      cur = cur.left;
    }
    return cur;
  }

  // rebalance() {}

  // 子树最大的节点
  max() {
    return this.right ? this.right.max() : this;
  }

  // 前一个节点 1. 左子树  2. 父节点
  prev() {
    if (this.left) {
      return this.left.max();
    }

    if (this.parent && this.parent.data.key < this.data.key) {
      return this.parent;
    }

    return null;
  }
  // 后一个节点  1. 右子树  2.父节点
  next() {
    if (this.right) {
      return this.right.min();
    }

    if (this.parent && this.parent.data.key > this.data.key) {
      return this.parent;
    }

    return null;
  }

  // 返回下界 (>= key 的第一个节点)
  lowerBound(key) {
    if (this.data.key < key) {
      if (this.right) {
        return this.right.lowerBound(key);
      }
      return null;
    }

    if (this.left) {
      const node = this.left.lowerBound(key);
      if (node) {
        return node;
      }
    }

    return this;
  }

  // 返回上界 (< key 的最后一个节点)
  upperBound(key) {
    if (this.data.key >= key) {
      if (this.left) {
        return this.left.upperBound(key);
      }
      return null;
    }

    if (this.right) {
      const node = this.right.upperBound(key);
      if (node) {
        return node;
      }
    }
    return this;
  }

  toStr() {
    return this.data.value
      ? `${this.data.key}:${this.data.value}`
      : `${this.data.key}`;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  find(key) {
    if (!this.root) return null;
    return this.root.find(key);
  }

  insert(key, value) {
    if (!this.root) {
      const node = new Node({ key, value });
      this.root = node;
      return node;
    }

    const node = this.root.insert(key, value);

    this.root = node.getRoot();
    return node;
  }

  remove(key) {
    if (!this.root) return false;

    const [removed, node] = this.root.remove(key);
    this.root = node;
    return removed;
  }

  print() {
    if (this.root) {
      this.root.print();
    }
  }
}

function test1() {
  const arr = [2, 4, 5, 7, 3, 8, 1, 9];
  let root = new Node({ key: 6 });
  arr.forEach((v) => {
    root.insert(v);
  });
  root.print();

  // console.log(root.find(8).toStr());
  root = root.find(6).erase();
  root.print();

  // root.find(2).remove();
  // root.print();
}

// test1();

function test2() {
  console.log("-----test2-----");
  const arr = [2, 4, 5, 7, 3, 8, 1, 9];
  let root = new Node({ key: 6 });
  arr.forEach((v) => {
    root.insert(v);
  });
  root.print();

  root.remove(5);
  root.print();

  console.log(root.max().toStr());
  console.log(root.prev().toStr());
  console.log(root.next().toStr());
  console.log(root.lowerBound(5).toStr());
  console.log(root.lowerBound(8.5).toStr());
  console.log(root.upperBound(5).toStr());
  console.log(root.upperBound(8).toStr());
}

// test2();

function test3() {
  const tree = new Tree();

  for (let i = 0; i < 10; i++) {
    tree.insert(i);
  }

  tree.print();

  tree.remove(5);

  tree.print();
}

test3();
