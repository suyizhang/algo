const { Stack } = require('../array/stack');

/**
 * 
 *
Node:
	new()
		data
		parent = null
		children = []

	appendChild(node)
	remove()
	
	isRoot()
	
	depth()
	height()

Tree:
	new()
		root = Node()

	height()
 */


class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }


  appendChild(node) {
    node.parent = this;
    this.children.push(node);
  }

  remove() {
    if (this.parent === null) {
      return;
    }

    const parent = this.parent;
    const i = parent.children.findIndex(v => v === this);
    parent.children.splice(i, 1);

  }

  isRoot() {
    return this.parent === null;
  }

  isLeaf() {
    return this.children.length == 0;
  }

  depth() {
    if (this.isRoot()) {
      return 0;
    }
    return 1 + this.parent.depth();
  }

  height() {
    if (this.isLeaf()) {
      return 0;
    }

    const max = Math.max(this.children.map(v => v.height()));
    return max + 1;
  }

  print() {
    this._print(0);
  }

  _print(indent) {
    console.log(new Array(indent).fill('  ').join('') + this.data);
    this.children.forEach(v => {
      v._print(indent + 1);
    });
  }

  	// 先序遍历
	preorder_traversal(func) {

  }
  
	// 后序遍历
  postorder_traversal(func) {

  }
    // 中序遍历
    // 队列实现
  levelorder_traversal(func) {

  }
}

/** 通过缩进文本来构建树 */
function build_from_indented_text(a, size) {
  // 使用 Node 与递归来实现
  if (!a) return;
  const arr = a.split('\n').map(v => {
    const reg = /^\s*/;
    const level = Math.floor(v.match(reg)[0].length / size);
    return {
      level,
      data: v.split(reg)[1] || v.split(reg)?.[0],
    }
  });

  const base = new Node();

  // index 目标 level
  function _build(arr, index, currentNode) {
    if (!arr.length) return;
      if (arr[0].level === index) {
        const node = new Node(arr[0].data);
       currentNode.appendChild(node);
       _build(arr.slice(1, ), index, currentNode);
      } else if (arr[0].level > index) {
        if (index + 1 !== arr[0].level) {
          throw new Error('层级不对');
        }
        const l = currentNode.children.length;
        _build(arr, index + 1, currentNode.children[l - 1]);
      } else if (arr[0].level < index) {
        _build(arr, index - 1, currentNode.parent);
      }
  }

  _build(arr, 0, base);
  return base.children[0];
}

// 逐行读上面文本对应树的深度遍历
// 栈 存放当前路径
//   去子节点 对应 push
//   去父节点 对应 pop
function build_from_indented_text_stack(a, size) {
  // 使用 栈 来实现
  if (!a) return;
  const arr = a.split('\n').map(v => {
    const reg = /^\s*/;
    const level = Math.floor(v.match(reg)[0].length / size);
    return {
      level,
      node: new Node(v.split(reg)?.[1] || v.split(reg)?.[0]),
    }
  });


  const stack = new Stack();

  const base = { level: -1, node: new Node() };

  stack.push(base);


  for(let i = 0; i < arr.length; i++) {
    while(stack.top().level + 1 !== arr[i].level) {
      stack.pop();
    }
    stack.top().node.appendChild(arr[i].node);
    stack.push(arr[i]);
  }

  return base.node.children[0];
}


// function test01() {

// }

  const a = 
  `/
    home
        fenglei
            share
    usr
        local
            share
                fonts`;


function test_build_node() {
  const node = build_from_indented_text(a, 4);
  node.print();
}


function test_build_stack () {
  const node = build_from_indented_text_stack(a, 4);
  node.print();
}

test_build_node();
/**
 * 
 * 
 /
    home
        fenglei
    usr
        local
            share
                fonts
 */
