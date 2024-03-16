const { Queue } = require("../array/arrayQueue");
// Node:
// 	data
// 	parent
// 	left
// 	right

// 	// 先序遍历
// 	preorder_traversal()
// 	// 后序遍历
// 	postorder_traversal()
// 	// 中序遍历
// 	inorder_traversal()

// 	print()

// """
//     A
//  B     F
// C  D G
//   E   H
// """

// """
// {
//     "e": "A",
//     "l": {
//         "e": "B",
//         "l": {
//             "e": "C"
//         },
//         "r": {
//             "e": "D",
//             "l": {
//                 "e": "E"
//             }
//         }
//     },
//     "r": {
//         "e": "F",
//         "l": {
//             "e": "G",
//             "r": {
//                 "e": "H"
//             }
//         }
//     }
// }
// """
// build_from_json()

class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  setLeft(node) {
    if (node) {
      node.parent = this;
    }
    this.left = node;
  }

  setRight(node) {
    if (node) {
      node.parent = this;
    }
    this.right = node;
  }

  // 先序遍历
  preorder_traversal(func) {
    func(this);

    if (this.left) {
      this.left.preorder_traversal(func);
    }
    if (this.right) {
      this.right.preorder_traversal(func);
    }
  }

  // 后序遍历
  postorder_traversal(func) {
    if (this.left) {
      this.left.postorder_traversal(func);
    }
    if (this.right) {
      this.right.postorder_traversal(func);
    }
    func(this);
  }

  // 中序遍历
  inorder_traversal(func) {
    if (this.left) {
      this.left.inorder_traversal(func);
    }
    func(this);
    if (this.right) {
      this.right.inorder_traversal(func);
    }
  }

  toStr() {
    return toString(this.data);
  }

  /**
 * 


    A
  B      F
C  D G
  E    H
 * 
 * 
 *      3
 *   2      8
 * 1  6
 */

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

/**
 *
 *      0
 *   1   2
 * 3 4 5 6
 *
 * n
 * 2n+1 2n+2
 *
 */

function binary_tree_test() {
  const node_list = [];
  for (let i = 0; i < 10; i++) {
    node_list.push(new Node(i));
  }

  const l = node_list.length;
  node_list.forEach((v, i) => {
    if (2 * i + 1 < l && node_list[2 * i + 1]) {
      v.appendChild(node_list[2 * i + 1], "left");
    }

    if (2 * i + 2 < l && node_list[2 * i + 2]) {
      v.appendChild(node_list[2 * i + 2], "right");
    }
  });

  const tree = node_list[0];

  tree.preorder_traversal((v) => console.log(v.data));
  tree.postorder_traversal((v) => console.log(v.data));
  tree.inorder_traversal((v) => console.log(v.data));
}

// binary_tree_test();
const tree_a = {
  e: "A",
  l: {
    e: "B",
    l: {
      e: "C",
    },
    r: {
      e: "D",
      l: {
        e: "E",
      },
    },
  },
  r: {
    e: "F",
    l: {
      e: "G",
      r: {
        e: "H",
      },
    },
  },
};

const tree_b = {
  e: "AA",
  l: {
    e: "BB",
    l: {
      e: "CC",
      r: {
        e: "DD",
        l: {
          e: "EE",
        },
      },
    },
  },
  r: {
    e: "FFF",
    l: {
      e: "EE",
      r: {
        e: "GGG",
        l: {
          e: "HHHH",
          r: {
            e: "JJJ",
          },
        },
      },
    },
  },
};

function build_from_obj(obj) {
  const c = new Node(obj.e);
  if (obj.l) {
    c.setLeft(build_from_obj(obj.l));
  }
  if (obj.r) {
    c.setRight(build_from_obj(obj.r));
  }
  return c;
}

function build_from_obj_test() {
  const node = build_from_obj(tree_b);
  node.print();
}

// build_from_json_test();
module.exports = { Queue };

module.exports = {
  Node,
  build_from_obj,
  tree_a,
}
