/** 链式地址哈希表 */

class HashMapChaining {
  constructor() {
    /** 键值对数量 */
    this.size = 0;
    /** 哈希表容量 */
    this.capacity = 4;
    /** 触发扩容的负载因子阈值 */
    this.loadThres = 2 / 3.0;
    /** 扩容倍数 */
    this.extendRatio = 2;
    /** 桶数组 */
    this.buckets = new Array(this.capacity).fill(null).map((x) => []);
  }

  /** 哈希函数 */
  hashFunc(key) {
    return key % this.capacity;
  }

  /** 负载因子 */
  loadFactor() {
    return this.size / this.capacity;
  }

  /** 查询操作 */
  get(key) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.val;
      }
    }

    return null;
  }

  /** 添加操作 */
  put(key, val) {
    // 当负载因子超过阈值时，执行扩容
    if (this.loadFactor() > this.loadThres) {
      this.extend();
    }

    const index = this.hashFunc(key);
    const bucket = this.buckets[index];

    // 遍历桶，若遇到指定 key ，则更新对应 val 并返回
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.val = val;
        return;
      }
    }
    // 若无该 key ，则将键值对添加至尾部
    const pair = new Pair(key, val);
    bucket.push(pair);
    this.size++;
  }

  /** 删除哈希表 */
  remove(key) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    // 遍历桶，从中删除键值对
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        break;
      }
    }
  }

  /** 扩容哈希表 */
  extend() {
    const bucketsTmp = this.buckets;

    this.capacity *= this.extendRatio;

    this.buckets = new Array(this.capacity).fill(null).map((x) => []);

    // 将键值对从原哈希表搬运至新哈希表
    for (const bucket of bucketsTmp) {
      for (const pair of bucket) {
        this.put(pair.key, pair.val);
      }
    }
  }

  /** 打印哈希表 */

  print() {
    for (const bucket of this.buckets) {
      let res = [];
      for (const pair of bucket) {
        res.push(pair.key + " -> " + pair.val);
      }
      console.log(res);
    }
  }
}
