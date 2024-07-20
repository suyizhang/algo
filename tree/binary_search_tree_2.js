const { Queue } = require("../array/arrayQueue");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }

  toStr() {
    return `${this.value}-${this.height}`;
  }
  print() {
    function _f(node, offset, y) {
      let left_width = 0;
      if (node.left) {
        _f(node.left, offset, y + 1);
        left_width = node.left.width;
      }

      let right_width = 0;
      if (node.right) {
        _f(node.right, offset + left_width + node.toStr().length, y + 1);
        right_width = node.right.width;
      }

      node.width = left_width + right_width + node.toStr().length;
      node.x = offset + left_width;
      node.y = y;
    }

    _f(this, 0, 0);

    const q = new Queue(1000);
    q.enqueue(this);

    let cur_x = 0;
    let cur_y = 0;
    const arr = [];

    function putStr(s) {
      cur_x += s.length;
      arr.push(s);
    }

    function newLine() {
      arr.push("\n");
      cur_y += 1;
      cur_x = 0;
    }

    while (!q._isEmpty()) {
      const node = q.dequeue();
      if (node.y === cur_y + 1) {
        newLine();
      }

      putStr(new Array(node.x - cur_x).fill(" ").join(""));
      putStr(node.toStr());

      if (node.left) {
        q.enqueue(node.left);
      }

      if (node.right) {
        q.enqueue(node.right);
      }
    }
    console.log(arr.join(""));
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  updateHeight(node) {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (!node) {
      return new Node(value);
    }
    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }

    node = this.banlance(node);

    return node;
  }


  leftRotate(node) {
    const new_root = node.right;
    node.right = new_root.left;
    new_root.left = node;
    this.updateHeight(node);
    this.updateHeight(new_root);
    return new_root;
  }
  
  rightRotate(node) {
    const new_root = node.left;
    node.left = new_root.right;
    new_root.right = node;
    this.updateHeight(node);
    this.updateHeight(new_root);
    return new_root;
  }

  banlance(node) {
    this.updateHeight(node);
    const diff = this.getHeight(node.left) - this.getHeight(node.right);
    // 左子树比右子树高
    if (diff > 1) {
      // 左子树的 右子树比左子树高
      if(this.getHeight(node.left.left) - this.getHeight(b.left.right) < 0) {
        node.left = this.leftRotate(node.left);
      }
      node = this.rightRotate(node);
    }
    // 左子树比右子树低
    if (diff < -1) {
      if (this.getHeight(node.right.left) - this.getHeight(node.right.right) > 0) {
        node.right = this.rightRotate(node.right);
      }
      node = this.leftRotate(node);
    }
    return node;
  }

  remove(value) {
    this.root = this._remove(this.root, value);
  }

  _remove(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._remove(node.left, value);
    } else if (value > node.value) {
      node.right = this._remove(node.right, value);
    } else {
      if (!node.left && !node.right) {
        node = null;
      } else if (!node.right) {
        node = node.left;
      } else if (!node.left) {
        node = node.right;
      } else {
        let minValue = this._findMinValue(node.right);
        node.value = minValue;
        node.right = this._remove(node.right, minValue);
      }
    }

    if (!node) {
      return null;
    }

    node = this.banlance(node);

    return node;
  }

  _findMinValue(node) {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
}

function treeTest() {
  const tree = new Tree();
  for (let i = 0; i < 10; i++) {
    tree.insert(i);
  }
  tree.root.print();

  tree.remove(3);
  tree.remove(6);
  tree.remove(7);
  tree.root.print();
}

treeTest();
