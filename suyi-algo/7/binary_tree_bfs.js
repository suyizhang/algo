/** 层序遍历 */
function levelOrder(root) {
  // 初始化队列 加入根节点
  const queue = [root];

  // 初始化一个列表 用于保存遍历序列
  const list = [];

  while (queue.length) {
    let node = queue.shift(); // 队列出队
    list.push(node.val);
    if (node.left) {
      queue.push(node.left); // 左子节点入队
    }
    if (node.right) {
      queue.push(node.right); // 右子节点入队
    }
  }
  return list;
}

/**
 * 逐层推进
 *
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 *
 */

/** 前序遍历 */
function preOrder(root) {
  if (root === null) null;

  //访问优先级 根节点 -> 左子树 -> 右子树
  list.push(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

function inOrder(root) {
  //访问优先级 左子树 -> 根节点 -> 右子树
  inOrder(root.left);
  list.push(root.val);
  inOrder(root.right);
}

/** 后序遍历 */
function postOrder(root) {
  //访问优先级 左子树 -> 右子树 -> 根节点
  inOrder(root.left);
  list.push(root.val);
  inOrder(root.right);
}
