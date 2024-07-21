class Pair {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class ArrayHashMap {
  constructor() {
    this.buckets = new Array(100).fill(null);
  }
  /** 哈希函数 */
  hashFunc(key) {
    return key % 100;
  }

  /** 查询操作 */
  get(key) {
    const index = this.hashFunc(key);
    const pair = this.buckets[index];
    if (pair === null) return null;
    return pair.val;
  }

  /** 添加操作 */
  set(key, val) {
    const index = this.hashFunc(key);
    this.buckets[index] = val;
  }

  /** 删除操作 */
  delete(key) {
    const index = this.hashFunc(key);
    this.buckets[index] = null;
  }
  
  /* 获取所有键值对 */
  entries() {
    const arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i]);
      }
    }
    return arr;
  }

  /* 获取所有键 */
  keys() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i].key);
      }
    }
    return arr;
  }

  /* 获取所有值 */
  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i].val);
      }
    }
    return arr;
  }

  /* 打印哈希表 */
  print() {
    let pairSet = this.entries();
    for (const pair of pairSet) {
      if (!pair) continue;
      console.info(`${pair.key} -> ${pair.val}`);
    }
  }
}
