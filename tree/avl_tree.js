// 性质: 对任一节点，左右子树的高度之差不大于 1

// 插入和删除操作时上述性质可能会被破坏，需要进行重平衡 (rebalance)

// Node:
// 	data = { key: ?, value: ? };
// 	height
	
// 	insert(key, value) -> Node
// 	remove(key) -> removed, Node (new_root)
	
// 	_rebalance() // 重新恢复平衡；递归；起点为新插入的节点
	// 高度之差为 2:
	//    左子树 h, 右子树 h+2
	//      右子树的左子树为 h+1
	// 		右子树的右子树为 h+1
	//    左子树 h+2, 右子树 h
  //      左子树的左子树为 h+1
	// 		  左子树的右子树为 h+1


const { Node: TreeNode } = require("./binary_search_tree");



class Node extends TreeNode {
     constructor(props) {
    super(props);
    this.height = 0;
  }

  
}


















// class Node extends TreeNode {
//   constructor(props) {
//     super(props);
//     this.height = 0;
//   }

//   toStr() {
//     return this.data.value
//       ? `${this.data.key}:${this.data.value}`
//       : `${this.data.key}`;
//   }
// }

// class AVLTree {
//   constructor() {
//     this.root = null;
//   }

//   getHeight(node) {
//     return node ? node.height : 0;
//   }

//   getBalanceFactor(node) {
//     return this.getHeight(node.left) - this.getHeight(node.right);
//   }

//   updateHeight(node) {
//     node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
//   }

//   rightRotate(node) {
//     const newRoot = node.left;
//     node.left = newRoot.right;
//     newRoot.right = node;
//     this.updateHeight(node);
//     this.updateHeight(newRoot);
//     return newRoot;
//   }

//   leftRotate(node) {
//     const newRoot = node.right;
//     node.right = newRoot.left;
//     newRoot.left = node;
//     this.updateHeight(node);
//     this.updateHeight(newRoot);
//     return newRoot;
//   }

//   insert({ key, value }) {
//     this.root =  this._insert(this.root, { key, value });
//   }

//   _insert(node, {key, value}) {
//     if (!node) return new Node({ key, value });
//     if (key < node.data.key) {
//       node.left = this._insert(node.left, { key, value });
//     } else if (key > node.data.key) {
//       node.right = this._insert(node.right, { key, value });
//     } else {
//       return node;
//     }

//     return this.reblance(node);
//   }

//   reblance(node) {
//     this.updateHeight(node);
//     const banlanceFactor = this.getBalanceFactor(node);
//     // 左子树高于右子树 右旋
//     if (banlanceFactor > 1) {
//       // 左子树的右子树比它的左子树高  先左旋再右旋
//       if (this.getBalanceFactor(node.left) < 0) {
//         node.left = this.leftRotate(node.left);
//       }
//       return this.rightRotate(node);
//       // 右子树高于左子树  左旋
//     } else if (banlanceFactor < -1) {
//       // 右子树的左子树比它的右子树高  先右旋再左旋
//       if (this.getBalanceFactor(node.right) > 0) {
//         node.right = this.rightRotate(node.right);
//       }
//       return this.leftRotate(node);
//     }
//     return node;
//   }

//   remove(key) {
//      this.root = this._remove(this.root, key);
//   }

//   _remove(node, key) {
//     if (!node) return;
//     if (key < node.data.key) {
//       this._remove(node.left, key);
//     } else if (key > node.data.key) {
//       this._remove(node.right, key);
//     } else {
//       const minNode = 
//     }

//   }
// }




// function node_test() {
//   const tree = new AVLTree();
//   tree.insert({ key: 10, value: 10 });
//   for (let i = 0; i < 20; i++) {
//     tree.insert({ key: i,value: i });
//   }

//   tree.root.print();
// }

// node_test();