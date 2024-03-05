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
    remove(i)
    get(i) -> x
    set(i, x)
    
    _extend() // 扩容
    _shrink() // 缩容; 可选
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
	enqueue(x)
	dequeue() -> x
	front() -> x
```

### 链表 (linked list)

### 哈希表 (hash table)

### 集合 (set)

### 树 (tree)

### 堆 (heap)

### 图 (graph)

## 算法 (algorithms)

## 力扣

## 工具箱

