const { Node: TreeNode } = require("./binary_tree");

// 左子树所有节点的 key "小于" 当前节点的 key
// 右子树所有节点的 key "大于" 当前节点的 key
// Node:
// 	key = ?; value = ?;
// 	// 或
// 	data = { key: ?, value: ? };

// 	insert(key, value) -> Node
// 	find(key) -> Node
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

  insert(key, value) {
    if (key === this.data.key) {
      this.data.value = value;
      return;
    }
    if (key < this.data.key) {
      if (!this.left) {
        this.setLeft(new Node({ key, value }));
        return;
      }
      this.left.insert(key, value);
    } else {
      if (!this.right) {
        this.setRight(new Node({ key, value }));
        return;
      }
      this.right.insert(key, value);
    }
  }
  // remove() -> Node (root)
  /** 将当前节点删除 返回子节点 */
  erase() {
    let new_root = null;
    if (!this.left && !this.right) {
    } else if (!this.left) {
      new_root = this.left;
    } else if (!this.right) {
      new_root = this.right;
    } else {
      let cur = this.right;
      while (cur.left) {
        cur = cur.left;
      }
      if (cur !== this.right) {
        cur.remove();
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
  remove(key) {
    // 判断当前key 是否在搜索树中
    if (!this.find(key)) throw new Error("");

    let removed = false;

    if (key < this.data.key) {
      if (this.left) {
        const params = this.left.remove(key);
        this.setLeft(params.node);
        removed = true;
      }
      return { removed, node: this };
    }

    if (key > this.data.key) {
      if (this.right) {
        const params = this.right.remove(key);
        this.setRight(params.node);
        removed = true;
      }
      return { removed, node: this };
    }

    removed = true;

    if (!this.left && !this.right) {
      return { removed, node: null };
    } else if (!this.right) {
      return { removed, node: this.left };
    } else if (!this.left) {
      return { removed, node: this.right };
    } else {
      const min = this.right.min();
      if (min !== this.right) {
        min.setRight(this.right.remove(min.data.key).node);
      }
      min.setLeft(this.left);
      return { removed, node: min };
    }
  }

  // 子树最小的节点
  min() {
    let cur = this;
    while (cur.left) {
      cur = cur.left;
    }
    return cur;
  }

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
    if(this.data.key < key) {
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
  console.log('-----test2-----');
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

test2();
