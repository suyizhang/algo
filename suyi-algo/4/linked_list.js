/* 链表节点类 */
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向下一节点的引用
  }
}

/* 初始化链表 1 -> 3 -> 2 -> 5 -> 4 */
// 初始化各个节点
const n0 = new ListNode(1);
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(5);
const n4 = new ListNode(4);
// 构建节点之间的引用
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;

/* 在链表的节点 n0 之后插入节点 P */
function insert(n0, P) {
  const n1 = n0.next;
  P.next = n1;
  n0.next = P;
}

/* 删除链表的节点 n0 之后的首个节点 */
function remove(n0) {
  if (!n0.next) return;
  // n0 -> P -> n1
  const P = n0.next;
  const n1 = P.next;
  n0.next = n1;
}

/* 访问链表中索引为 index 的节点 */
function access(head, index) {
  for (let i = 0; i < index; i++) {
    if (!head) {
      return null;
    }
    head = head.next;
  }
  return head;
}

/* 在链表中查找值为 target 的首个节点 */
function find(head, target) {
  let index = 0;
  while (head !== null) {
    if (head.val === target) {
      return index;
    }
    head = head.next;
    index += 1;
  }
  return -1;
}

/**
 * 
 * 
 * 	          数组	        链表
    存储方式	连续内存空间	分散内存空间
    容量扩展	长度不可变	可灵活扩展
    内存效率	元素占用内存少、但可能浪费空间	元素占用内存多
    访问元素	O(1)  O(n)
    添加元素	O(n)  O(1)
    删除元素	O(n)  O(1)
 */

/**
 * 单向链表：即前面介绍的普通链表。单向链表的节点包含值和指向下一节点的引用两项数据。我们将首个节点称为头节点，将最后一个节点称为尾节点，尾节点指向空 None 。
   环形链表：如果我们令单向链表的尾节点指向头节点（首尾相接），则得到一个环形链表。在环形链表中，任意节点都可以视作头节点。
   双向链表：与单向链表相比，双向链表记录了两个方向的引用。双向链表的节点定义同时包含指向后继节点（下一个节点）和前驱节点（上一个节点）的引用（指针）。相较于单向链表，双向链表更具灵活性，可以朝两个方向遍历链表，但相应地也需要占用更多的内存空间。
     */

/* 双向链表节点类 */
class ListNode {
  constructor(val, next, prev) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向后继节点的引用
    this.prev = prev === undefined ? null : prev; // 指向前驱节点的引用
  }
}
