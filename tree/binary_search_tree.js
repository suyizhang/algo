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
  remove() {
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

  //removeByKey(key) -> removed, Node (new_root)
  removeByKey(key) {
    if (key === this.data.key) {
      if (!this.left && !this.right) {
        return { removed: true, node: null };
      } else if (!this.left) {
        return { removed: true, node: this.right };
      } else if (!this.right) {
        return { removed: true, node: this.left };
      } else {
        const minNode = this.right.findMinNode();

        if (minNode !== this.right) {
          minNode.setRight(this.right.removeByKey(minNode.data.key).node);
        }
        minNode.setLeft(this.left);

        return { removed: true, node: minNode };
      }
    } else if (key < this.data.key) {
      if (this.left) {
        const x = this.left.removeByKey(key);
        this.setLeft(x.node);
        return { removed: x.removed, node: this };
      } else {
        return { removed: false, node: this };
      }
    } else {
      if (this.right) {
        const x = this.right.removeByKey(key);
        this.setRight(x.node);
        return { removed: x.removed, node: this };
      } else {
        return { removed: false, node: this };
      }
    }
  }

  findMinNode() {
    let cur = this;
    while (cur.left) {
      cur = cur.left;
    }
    return cur;
  }

  toStr() {
    return `${this.data.key}:${this.data.value}`;
  }
}

function binary_search_tree_test() {
  const arr = [2, 4, 5, 7, 3, 8, 1, 9];
  let root = new Node({ key: 6, value: 6 });
  arr.forEach((v) => {
    root.insert(v, v);
  });
  root.print();

  // console.log(root.find(8).toStr());
  root = root.find(6).remove();
  root.print();

  // root.find(2).remove();
  // root.print();
}

binary_search_tree_test();

function binary_search_tree_test_2() {
  const arr = [2, 4, 5, 7, 3, 8, 1, 9];
  let root = new Node({ key: 6, value: 6 });
  arr.forEach((v) => {
    root.insert(v, v);
  });

  root = root.removeByKey(6).node;
  // root.removeByKey(2);
  root.print();
}

binary_search_tree_test_2();
