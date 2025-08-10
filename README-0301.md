## 数据结构 (data structures)

### 数组 (array)

#### 静态数组 (static array)

容量固定

```c
int a[100];
a[i];
a[i] = v;
```

#### 动态数组 (dynamic array)

容量可动态变化

```
DynamicArray:
    new()
        data // 静态数组
     size // 元素个数
     capacity // 容量

    insert(i, x)
    append(x)
    pop()
    remove(i)
    get(i) -> x
    set(i, x)

    _extend() // 扩容

    // 可选
    _shrink_to_fit() // 将 capacity 设为与 size 相同
    _reserve(new_cap) // 新的 capacity
```

在 JS 中:

```js
const arr = [1, 2, 3];

new Array(1, 2, 3);
```

### 字符串 (string)

元素是字符的动态数组

在 JS 中:

字符是 [UTF-16 code point](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

Unicode: 所有的字符都有一个编号 (code value)。对编号的编码有多种方式，如 UTF-8, UTF-16, UTF-32。对每种编码，其中的一个基本单元称为 code unit/point。在 UTF-16 中每个 code unit 是两个字节。

```js
s = 'abc早上好'
// s 是一个 code unit (动态) 数组

s.charCodeAt(i) // 是一个 code value. 在 UTF-16 中, 有的 code value (e.g. 大于 65536) 需要多个 code unit 来编码
s.charAt(i)
s[i]

s.codePointAt(i) // 是一个 code unit

String.fromCharCode()
String.fromCodePoint()
```

```javascript
function my_join(str, array) {
  if (!array.length) return '';
  let s = array[0].toString();
  for (let i = 1; i < array.length; i++ ) {
    s += str + array[i];
  }
  return s;
}

// Array.join()
```

### 栈 (stack)

```
Stack:
    new()
     data = []

 push(x)
 pop() -> x
 top() -> x
```

### 队列 (queue)

```
Queue:
 new()
  data = []
 enqueue(x) // 入列
 dequeue() -> x // 出列
 front() -> x // 队首
```

```
// 循环队列
ArrayQueue:
  new(max_size)
    data = []
    head
    tail

  enqueue(x) // 入列
   if (_full()) error
   data[tail] = x
   tail += 1

  dequeue() -> x // 出列
   if (_empty()) error
   ret = data[head]
   head += 1
   return ret

  front() -> x

  _empty(): // 队列空
   return head == tail

  _full(): // 队列满
   return _step_right(tail) == head

  _step_right(i): // 向右走一步
   return (i+1) % max_size

// 改进
// 若采用动态扩容, 则不用指定 max_size
```

```
// 双端队列
ArrayDeque:
  new(max_size)
    data = []

  pushFront(x)
  popFront() -> x
  front() -> x
  pushBack()
  popBack() -> x
  back() -> x

  _step_left(i): 向左走一步
   return (i-1+max_size) % max_size
```

### 链表 (linked list)

```
Node:
 new(data)
  next
  data

 insertAfter(node)
 removeAfter(node)

// 单链表
LinkedList:
 new()
  // 空的两种表示方式

  // 一
  // head = null

  // 二
  head = Node()

  size // 链表中元素个数

 insertAfter(node, x) // 插入

 forEach(fn) // 遍历节点

 append(x)
  p = head
  while (p.next) {
    p = p.next
  }
  p.insertAfter(Node(x))

 prepend(x)
  head.insertAfter(Node(x))

 remove(node) // 删除

 search(fn) // 查找节点

 print()
```

```
Node:
 new()
  prev
  next
  data

  insertAfter(node)
  insertBefore(node)
  remove()

// 双链表
LinkedList:
 new()
  dummy = Node()
  head = dummy
  tail = head

  size // 链表中元素个数

 insert(i, x)
 append(x)
 prepend(x)
 get(i)
 set(i, x)

 print()
 _print(indent)
```

```
// 循环链表

// 用链表也能实现 栈, 队列
```

### 树 (tree)

```堆 (heap)
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

 print()

 // 先序遍历
 preorder_traversal(func)
 // 后序遍历
    postorder_traversal(func)
    // 层序遍历
    // 队列实现
    levelorder_traversal(func)

"""
/
    home
        fenglei
    usr
        local
            share
                fonts
"""
// 逐行读上面文本 对应 树的深度遍历
// 栈 存放当前路径
//   去子节点 对应 push
//   去父节点 对应 pop
build_from_indented_text()
```

### 二叉树 (binary tree)

```
Node:
 parent
 left
 right

 data

 // 先序遍历
 preorder_traversal()
 // 后序遍历
 postorder_traversal()
 // 中序遍历
 inorder_traversal()

 print()
 toStr()

"""
{
    "e": "A",
    "l": {
        "e": "B",
        "l": {
            "e": "C"
        },
        "r": {
            "e": "D",
            "l": {
                "e": "E"
            }
        }
    },
    "r": {
        "e": "F",
        "l": {
            "e": "G",
            "r": {
                "e": "H"
            }
        }
    }
}
"""

build_from_obj()
```

```
"""
    A
 B     F
C  D G
  E   H
"""

print(node) {
  // 构思递归算法的关键是识别目标对象的上下文
  //                     子树 (node) 的位置 (offset, y)
  _f(node, offset, y) {
   left_width = 0
   if (node.left)
    _f(node.left, offset, y+1)
    left_width = node.left.width

   s = node.toStr()
   right_width = 0
   if (node.right)
    _f(node.right, offset + left_width + s.length, y+1)
    right_width = node.right.width

   node.width = left_width + right_width + s.length
   node.x = offset + left_width
   node.y = y
  }

  _f(root, 0, 0)

  q = Queue()
  q.enqueue(root)

  cur_x = 0
  cur_y = 0

  putStr() { }
  newline() { }

  while (!q.isEmpty()) {
   node = q.dequeue()
   if (node.y == cur_y + 1) {
    newline()
   }
   putStr(' ' * (node.x - cur_x))
   putStr(node.toStr())

   if (node.left) q.enqueue(node.left)
   if (node.right) q.enqueue(node.right)
  }
}
```

### 二叉搜索树 (binary search tree)

```
// 左子树所有节点的 key "小于" 当前节点的 key
// 右子树所有节点的 key "大于" 当前节点的 key
Node:
 // key = ?; value = ?;
 // 或
 data = { key: ?, value: ? };

 find(key) -> Node

 lowerBound(key) -> Node // 返回下界 (>= key 的第一个节点)
 upperBound(key) -> Node // 返回上界 ( > key 的第一个节点)

 insert(key, value) -> Node, root

 _erase() -> root // 将当前节点删除，返回子树的根节点
 remove(key) -> removed, root // 根据 key 找到节点，并删除; 返回子树的根节点

 min() -> Node // 子树最小的节点
 max() -> Node // 子树最大的节点
 prev() -> None // 前一个节点
 next() -> Node // 后一个节点

Tree:
 _root

 find(key) -> Node
 insert(key, value) -> Node
 remove(key) -> bool
```

一般二叉搜索树存在的问题

```
1
 2
  3
   4
    5
```

平衡二叉树

#### AVL 树 (AVL tree)

```
// 高度:
//   null -1
//   leaf 0

// 性质: 对任一节点，左右子树的高度之差不大于 1

// 插入和删除操作时上述性质可能会被破坏，需要进行重平衡 (rebalance)

Node:
 data = { key: ?, value: ? };
 height

 insert(key, value) -> Node, root
 remove(key) -> removed, root

 _balance() -> root // 恢复平衡；返回新的根节点
 // 高度之差为  2:
 //    左子树的左子树高
 //    左子树的右子树高
 // 高度之差为 -2:
 //    右子树的左子树高
 //    右子树的右子树高
```

#### 伸展树 (Splay tree)

#### 红黑树 (Red-Black tree)

#### TreeMap

```
Map:
 set(key, value)
 get(key) -> value
 contains(key) -> bool
 forEach(func)

// O(log N)
TreeMap: Map
 rangeFor(firstKey, lastKey, func)
```

#### TreeSet

```
Set:
 add(key)
 contains(key)
 remove(key)
 forEach(func)

// O(log N)
TreeSet: Set
 rangeFor(firstKey, lastKey, func)
```

### 优先队列 (priority queues)

```
PriorityQueue:
 add(x)
 min() -> x
 removeMin() -> x
```

#### 二叉堆 (binary heap)

```
// 树的数组表示
a[i] 的左子节点为 a[i*2], 右子节点为 a[i*2+1], 父节点为 a[i/2]

Node:
 arr
 idx

 data = { key: ?, value: ? }

 getParent() -> Node
 getLeft() -> Node
 getRight() -> Node

 _percolate_up()
 _percolate_down()

Node arr[]
```

```
二叉堆是一个完全二叉树 (高度 log(N))

任一节点的 key <= 子节点的 key
 m 层节点的 key <= m + 1 层节点的 key

BinaryHeap:
 add(x) // log(N)
  将 x 放在数组末尾
  "上滤"
 min() -> x
 removeMin() -> x // log(N)
  将根节点替换为数组末尾的节点
  "下滤"

通过 add(x) 构建 BinaryHeap 的复杂度: N * log(N)

build_heap() // 复杂度 N
 从倒数第二层开始逐层 "下滤"
```

### 哈希表 (hash table)

```
哈希函数: 将输入 (e.g. 整数, 字符串, 对象) 映射为整数

hash_string(s):
 hash_code = 0
    for c in s:
     hash_code = 37 * hash_code + c
    return hash_code

hash_number(x):
 return hash_string('{' + x + '}')

hash_array(arr):
 hash_code = 0
 for x in arr:
  hash_code = hash_code ^ hash(x)
 return hash_code

hash_obj(obj):
 hash_code = 0
 for k, v in obj:
  hash_code = hash_code ^ hash(k) ^ hash(v)
 return hash_code

hash(x):
 switch (typeof(x)) {
 case 'number': return hash_number(x)
 case 'string': return hash_string(x)
 case 'array': return hash_array(x)
 case 'object': return hash_obj(x)
 default: run_error
 }
```

```
Node:
 key
 value

哈希表的基本思想:
 table // 用于存放 node 的数组

 添加 key, value: O(1)
  node = Node(key, value)
        idx = hash(node.key) % table_size
        将 node 存放在 table[idx]

    根据 key 查找: O(1)
     idx = hash(key)
     node = table[idx] ?
     return node.value

冲突:
 两个 node 映射到相同的 idx

冲突的解决:
 链表法:
  将相同 idx 的 node 存放在链表中

 探测法:
  线性探测: 依次尝试 idx, idx+1, idx+2, idx+3, ...
  平方探测: 依次尝试 idx, idx+1, idx+4, idx+9, ...

为了减少冲突, 表的大小应该为素数

重哈希
 为了保证查找性能, 哈希表不能太满

 当表的使用率 (表中 node 个数/表大小) 达到一定值 (称为负载因子 (load factor)) 时需要进行重哈希 (rehash)

 分配一个两倍大小的新表, 将所有 node 加入新表
```

```
// 是否是素数
is_prime(n):
 for (i = 2; i < n; i++)
  if (n % i == 0)
   return false
 return true

// >= n 的最小素数
next_prime(n):
 while (true) {
  if (is_prime(n))
   return n
  n++;
 }

HashTable:

 init(init_table_size)
  init_table_size = next_prime(init_table_size) // 初始表大小

  table = [null] * init_table_size // 表
  table_size
  size = 0 // 哈希表中元素个数

  load_factor = 0.8 // 负载因子

 put(key, value) // 链表法
 get(key) -> value
 remove(key) // 删除 key

 _hash(key) // 哈希函数
  string
  number
  array
  object

 _rehash() // 重哈希
```

```
HashMap
 table = new HashTable()

 set(k, v)
 get(k) -> v
 contains(k)
 remove(k)

HashSet
 map = new HashMap()

 add(k)
 remove(k)
 contains(k)
```

### 图 (graph)

```
图的构成
 节点 (node)
 边 (edge)

图的分类
 无向图 (undirected graph): 边无方向
 有向图 (directed graph): 边有方向

图的表示
 邻接矩阵 (适合密集图)
  对于一个有 M 个节点的图, 用一个 MxM 的二维数组 arr 表示
  arr[i][j] == 1 表示存在节点 i -> 节点 j 的边
  对于无向图, arr[i][j] == arr[j][i]

 邻接链表
  对于一个有 M 个节点的图, 用一个长度 M 的数组 arr 表示
  arr[i] 是一个链表, 链表中的每个元素 j 表示存在节点 i -> 节点 j 的边
```

```
Node
 key
 value
 neighbors // 相连的节点数组

Edge
 node_a, node_b
 value

UndirectedGraph
 nodes // 一个 hashmap: key -> node
 edges // 一个 hashmap: (key_a, key_b) -> Edge
       //               key_a <= key_b

 // key 均为字符串

 add_node(key)
 get_node(key)
 remove_node(key)

 add_edge(key_a, key_b)
 get_edge(key_a, key_b)
 remove_edge(key_a, key_b)

 print()
  // 采用邻接链表的形式打印
  for node in nodes:
   print(node)
   for neighbor in node.neighbors:
    print(neightbor)   

// 构建树
g = UndirectedGraph()
g.add_node('a')
g.add_node('b')
g.add_node('a')
...
g.add_edge('a', 'b')
g.add_edge('b', 'a') // 无作用
g.add_edge('b', 'c')
...

g.get_edge('a', 'b') == g.get_edge('b', 'a')

g.remove_edge('b', 'a')
g.get_edge('a', 'b') == null
```

```
Node:
 key
 value
 in // 进的节点
 out // 出的节点

Edge:
 node_a, node_b
 value

DirectedGraph
 nodes // 一个 hashmap: key -> node
 edges // 一个 hashmap: (key_a, key_b) -> edge

 add_node(key)
 get_node(key)
 remove_node(key)

 add_edge(key_a, key_b)
 get_edge(key_a, key_b)
 remove_edge(key_a, key_b)

 print()
```

```
// BFS (广度优先遍历)
```

```
// DFS (深度优先遍历)
```

```
// 拓扑排序
```

```
// Dijkstra’s Algorithm (迪杰斯特拉算法)
```

## 算法 (algorithms)

### 排序

* Insertion Sort

* Mergesort

* Quicksort

  split

* Heapsort

* Bucket Sort

* External Sorting

  * Multiway Merge

### Divide and Conquer

### Dynamic Programming

### Backtracking

```
_paths(key_a, key_b) // 返回所有 node_a -> node_b 的路径
```

## 力扣

### 状态机

parseFloat()

### 工具箱

#### JS

```js

```

#### 递归算法的非递归实现

```
// 适用于无返回值的递归函数

// 先序遍历
f(node) {
    g(node);
    for (let i = 0; i < node.children.length; i++) {
      f(node.children[i]);
    }
}

stack = []
stack.push(['f', node])
while (!stack.empty()) {
  func, arg = stack.pop()
  if (func == 'f') {
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push(['f', node.children[i]])
    }
    stack.push(['g', node])
  } else if (func == 'g') {
   g(node)
  }
}
```
