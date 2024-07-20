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
    this.height = 0;
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

  refreshHeight() {
    this.height = 1 + Math.max(this.getRightH(), this.getLeftH());
  }

  getRightH() {
    return this.right ? this.right.height : -1;
  }

  getLeftH() {
    return this.left ? this.left.height : -1;
  }

  // 返回插入的节点与子树的根节点
  insert(key, value) {
    if (key === this.data.key) {
      this.data.value = value;
      return [this, this];
    }
    let newNode = null;
    if (key < this.data.key) {
      if (this.left) {
        const [a] = this.left.insert(key, value);
        newNode = a;
      } else {
        newNode = new Node({ key, value });
        this.setLeft(newNode);
      }
    } else {
      if (this.right) {
        const [a] = this.right.insert(key, value);
        newNode = a;
      } else {
        newNode = new Node({ key, value });
        this.setRight(newNode);
      }
    }
    const root = this._balance();
    return [newNode, root];
  }

  _balance_upward() {
    const arr = [];

    let p = this;
    while (p) {
      arr.push(p);
      p = p.parent;
    }

    let root = null;

    arr.forEach((v) => {
      root = v._balance();
    });
    return root;
  }

  // 返回当前节点
  _balance() {
    const diff = this.getLeftH() - this.getRightH();
    let a = this;
    let b = null;
    let c = null;

    let parent = a.parent;

    let root = a;
    if (diff === 2) {
      b = a.left;
      if (b.getLeftH() > b.getRightH()) {
        a.setLeft(b.right);
        b.setRight(a);
        root = b;
      } else {
        c = b.right;
        a.setLeft(c.right);
        b.setRight(c.left);
        c.setRight(a);
        c.setLeft(b);
        root = c;
      }
    } else if (diff === -2) {
      b = a.right;
      if (b.getLeftH() < b.getRightH()) {
        a.setRight(b.left);
        b.setLeft(a);
        root = b;
      } else {
        c = b.left;
        a.setRight(c.left);
        b.setLeft(c.right);
        c.setRight(b);
        c.setLeft(a);
        root = c;
      }
    }

    // 设置root.parent (parent 可能为null)
    root.parent = parent;

    if (parent) {
      // console.log(parent?.left === a, parent?.right === a);
      if (parent.left === a) {
        parent.setLeft(root);
      } else if (parent.right === a) {
        parent.setRight(root);
      }
    }

    a.refreshHeight();

    if (b) {
      b.refreshHeight();
    }

    if (c) {
      c.refreshHeight();
    }

    return root;
  }

  /** 返回根节点 */
  remove(key) {
    const node = this.find(key);
    if (!node) return [false, this];
    const root = node._erase(key);
    return [true, root];
  }

  /** 将当前节点删除 返回根节点 */
  _erase() {
    let new_root = null;
    // 作为_balance_upward 的起点 向上
    let start = null;
    if (!this.left && !this.right) {
      new_root = this.parent;
      start = new_root;
    } else if (!this.left) {
      new_root = this.right;
      start = new_root;
    } else if (!this.right) {
      new_root = this.left;
      start = new_root;
    } else {
      let cur = this.right;
      while (cur.left) {
        cur = cur.left;
      }
      if (cur !== this.right) {
        // cur移走后将cur右子节点挂在cur父节点下  删除cur
        cur.parent.setLeft(cur.right);
        cur.setRight(this.right);
      }
      cur.setLeft(this.left);
      new_root = cur;
      start = cur.parent;
    }

    if (this.parent) {
      if (this.parent.left === this) {
        this.parent.setLeft(new_root);
      } else if (this.parent.right === this) {
        this.parent.setRight(new_root);
      }
    } else {
      new_root.parent = null;
    }

    this.parent = null;
    this.left = null;
    this.right = null;

    if (start === null) {
      return null;
    }

    return start._balance_upward();
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
    const key = this.data.key;
    let p = this;

    while (p) {
      if (p.data.key < key) {
        return p
      }
      if (p.left && p.left.data.key < key) {
        return p.left.max()
      }
      p = p.parent
   }

    return null;
  }
  // 后一个节点  1. 右子树  2.父节点
  next() {
    const key = this.data.key;
    let p = this;

    while (p) {
      if (p.data.key > key) {
        return p
      }
      if (p.right && p.right.data.key > key) {
        return p.right.min()
      }
      p = p.parent
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

  // 返回上界 (> key的第一个节点)
  upperBound(key) {
    if (this.data.key <= key) {
      if (this.right) {
        this.right.upperBound(key);
      }
      return null;
    }

    if (this.left) {
      const node = this.left.upperBound(key);
      if (node) {
        return node;
      }
    }

    return this;
    // if (this.data.key >= key) {
    //   if (this.left) {
    //     return this.left.upperBound(key);
    //   }
    //   return null;
    // }

    // if (this.right) {
    //   const node = this.right.upperBound(key);
    //   if (node) {
    //     return node;
    //   }
    // }
    return this;
  }

  toStr() {
    return this.data.value
      ? `${this.data.key}:${this.data.value}:${this.height}`
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

    const [node, root] = this.root.insert(key, value);

    this.root = root;
    return node;
  }

  remove(key) {
    if (!this.root) return false;
    const [status, root] = this.root.remove(key);
    this.root = root;
    return status;
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
    const a = tree.insert(i);
  }

  tree.print();

  tree.remove(3);
  tree.print();
  tree.remove(1);
  tree.print();
}

// test3();

module.exports = {
  Tree,
};
