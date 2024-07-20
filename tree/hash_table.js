/**
 * 哈希表 (hash table)
哈希函数: 将输入 (e.g. 整数, 字符串, 对象) 映射为整数
hash_string(s):
    hash_code = 0
    for c in s:
        hash_code = 37 * hash_code + c
    return hash_code
hash_int(i):
    return i
Node: key
value 哈希表的基本思想:
table // 用于存放 node 的数组 添加 key, value: O(1)
 node = Node(key, value)
idx = hash(node.key) % table_size 将 node 存放在 table[idx]
根据 key 查找: O(1) idx = hash(key)
        node = table[idx] ?
        return node.value
冲突:
两个 node 映射到相同的 idx
冲突的解决: 链表法:
将相同 idx 的 node 存放在链表中
探测法:
线性探测: 依次尝试 idx, idx+1, idx+2, idx+3, ... 平方探测: 依次尝试 idx, idx+1, idx+4, idx+9, ...
为了减少冲突, 表的大小应该为素数 重哈希
为了保证查找性能, 哈希表不能太满
当表的使用率 (表中 node 个数/表大小) 达到一定值 (称为负载因子 (load factor)) 时需要进行
重哈希 (rehash)
分配一个两倍大小的新表, 将所有 node 加入新表
      // 是否是素数 is_prime(n):
    for (i = 2; i < n; i++)
        if (n % i == 0)
            return false
    return true
// >= n 的最小素数 next_prime(n):
    while (true) {
        if (is_prime(n))
return n n++;
} HashTable:
init(init_table_size)
init_table_size = next_prime(init_table_size) // 初始表大小
table = [null] * init_table_size // 表 table_size
size = 0 // 哈希表中元素个数
load_factor = 0.8 // 负载因子
   
put(key, value) // 链表法 get(key) -> value remove(key) // 删除 key
_hash(key) // 哈希函数 _rehash() // 重哈希
 */

/**
 * 
 * 哈希函数: 将输入 (e.g. 整数, 字符串, 对象) 映射为整数

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
 */

const { LinkedList } = require("../linkedList/linkedList2");

class HashTable {
  constructor(init_table_size) {
    this.table = [];
    this.init_table_size = this.next_prime(init_table_size);
    // table 数组大小
    this.table_size = init_table_size;
    // 元素个数
    this.size = 0;
    this.load_factor = 0.8;
  }

  is_prime(n) {
    for (let i = 2; i < n; i++) if (n % i == 0) return false;
    return true;
  }

  next_prime(n) {
    while (true) {
      if (this.is_prime(n)) {
        return n;
      }
      n++;
    }
  }

  hash(s) {
    const s_type = dataType(s);
    switch (s_type) {
      case "String": {
        return this.hash_string(s);
      }

      case "Number": {
        return this.hash_number(s);
      }

      case "Array": {
        return this.hash_arr(s);
      }

      case "Object": {
        return this.hash_obj(s);
      }

      default: {
        throw new Error("暂不支持");
      }
    }
  }

  hash_string(s) {
    let hash_code = 0;
    if (!s) return hash_code;
    for (let i = 0; i < s.length; i++) {
      hash_code = 37 * hash_code + s.charCodeAt(i);
    }

    return hash_code;
  }

  hash_number(s) {
    return this.hash_string(`{${s}}`);
  }

  hash_arr(s) {
    let hash_code = this.hash("array");

    for (let i = 0; i < s.length; i++) {
      hash_code = hash_code ^ this.hash(s[i]) ^ this.hash(i);
    }

    return hash_code;
  }

  hash_obj(s) {
    let hash_code = this.hash("object");

    Object.entries(s).forEach(([key, value]) => {
      hash_code = hash_code ^ this.hash(key) ^ this.hash(value);
    });

    return hash_code;
  }

  _get_hash_key(key) {
    const hash_key = this.hash(key) % this.table_size;
    return hash_key < 0 ? hash_key + this.table_size : hash_key;
  }

  put(key, value) {
    const hash_key = this._get_hash_key(key);

    if (!this.table[hash_key]) {
      this.table[hash_key] = new LinkedList();
    }

    const li = this.table[hash_key];

    const node = li.findByF((v) => v.key === key);

    if (node) {
      node.data.value = value;
      return;
    }

    li.append({ key, value });
    this.size += 1;
    this._rehash();
  }

  _rehash() {
    if (this.size / this.table_size >= this.load_factor) {
      const arr = [];

      this.forEach((v) => {
        arr.push(v);
      });

      const new_table_size = this.next_prime(this.table_size * 2 + 1);

      this.reset();

      this.table_size = new_table_size;
      for (let i = 0; i < arr.length; i++) {
        this.put(arr[i].key, arr[i].value);
      }
    }
  }

  forEach(func) {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        let p = this.table[i].head.next;
        while (p) {
          func(p.data);
          p = p.next;
        }
      }
    }
  }

  reset() {
    this.table = [];
    this.table_size = this.init_table_size;
    this.size = 0;
  }

  get(key) {
    const hash_key = this._get_hash_key(key);

    if (this.table[hash_key]) {
      let c = this.table[hash_key].head.next;

      while (c) {
        if (String(c.data.key) === String(key)) {
          return c.data;
        }
        c = c.next;
      }
      return null;
    }
    return null;
  }

  contains(key) {
    return !!this.get(key);
  }

  remove(key) {
    const hash_key = this._get_hash_key(key);

    if (this.table[hash_key]) {
      const li = this.table[hash_key];
      if (li.removeByF((i) => String(i.data.key) === String(key))) {
        this.size -= 1;
      }
    }
  }
}

class HashMap {
  constructor(init_table_size) {
    this.table = new HashTable(init_table_size);
  }

  set(key, value) {
    this.table.put(key, value);
  }

  get(key) {
    const node = this.table.get(key);
    return node ? node : null;
  }

  remove(key) {
    this.table.remove(key);
  }

  contains(key) {
    return !!this.table.contains(key);
  }

  forEach(func) {
    this.table.forEach(func);
  }

  size() {
    return this.table.size;
  }
}

class HashSet {
  constructor(init_table_size) {
    this.map = new HashMap(init_table_size);
  }

  add(key) {
    this.map.set(key);
  }

  get(key) {
    const node = this.map.get(key);
    return node ? node : null;
  }
  remove(key) {
    this.map.remove(key);
  }

  contains(key) {
    return !!this.map.contains(key);
  }

  forEach(func) {
    this.map.forEach(func);
  }

  size() {
    return this.map.size();
  }
}

function test_hash_map() {
  console.log("--- test_hash_map start ---");
  const map = new HashMap(10);

  map.set("a", 100);
  map.set("b", 200);
  map.set("c", 300);
  console.assert(map.get("a") === 100);

  map.set("a", 10);
  console.assert(map.get("a") === 10);

  console.assert(map.size() === 3);

  console.assert(map.contains("c"));

  map.remove("c");
  console.assert(!map.contains("c"));
  console.assert(map.size() === 2);
  console.log("--- test_hash_map end ---");
}

// test_hash_map();

function test_hash_set() {
  console.log("--- test_hash_set start ---");
  const set = new HashSet(10);
  for (let i = 0; i < 1000; i++) {
    set.add(i);
  }
  console.assert(set.size() === 1000);

  for (let i = 0; i < 1000; i++) {
    set.remove(i);
  }
  console.assert(set.size() === 0);

  console.assert(!set.contains(10));

  console.log("--- test_hash_set end ---");
}

// test_hash_set();

module.exports = {
  HashMap,
  HashSet,
};

function dataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
