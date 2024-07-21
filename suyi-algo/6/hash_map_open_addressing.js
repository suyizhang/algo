/** 开放寻址哈希表 */
class Pair {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class HashMapOpenAddressing {
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

    this.removed = new Pair(-1, "-1");
  }

  /* 哈希函数 */
  hashFunc(key) {
    return key % this.capacity;
  }

  /* 负载因子 */
  loadFactor() {
    return this.size / this.capacity;
  }

  /** 查询操作 */
  get(key) {
    const index = this.hashFunc(key);

    /** 线性探测 从 index 开始向后遍历 */

    for (let i = 0; i < this.capacity; i++) {
      // 计算桶索引，越过尾部返回头部
      const j = (index + i) % this.capacity;
      // 若遇到空桶，说明无此 key ，则返回 null
      if (this.buckets[j] === null) return null;
      // 若遇到指定 key ，则返回对应 val
      if (
        this.buckets[j].key === key &&
        this.buckets[j][key] !== this.removed.key
      )
        return this.buckets[j].val;
    }

    return null;
  }

  /** 添加操作 */
  put(key) {
    // 当负载因子超过阈值时，执行扩容
    if (this.loadFactor() > this.loadThres) {
      this.extend();
    }
    const index = this.hashFunc(key);
    // 线性探测，从 index 开始向后遍历
    for (let i = 0; i < this.capacity; i++) {
      // 计算桶索引，越过尾部返回头部
      let j = (index + i) % this.capacity;

      // 若遇到空桶、或带有删除标记的桶，则将键值对放入该桶
      if (
        this.buckets[j] === null ||
        this.buckets[j][key] === this.removed.key
      ) {
        this.buckets[j] = new Pair(key, val);
        this.size += 1;
        return;
      }
      // 若遇到指定 key ，则更新对应 val
      if (this.buckets[j].key === key) {
        this.buckets[j].val = val;
        return;
      }
    }
  }

  /* 删除操作 */
  remove(key) {
    const index = this.hashFunc(key);
    // 线性探测，从 index 开始向后遍历
    for (let i = 0; i < this.capacity; i++) {
      // 计算桶索引，越过尾部返回头部
      const j = (index + i) % this.capacity;
      // 若遇到空桶，说明无此 key ，则直接返回
      if (this.buckets[j] === null) {
        return;
      }
      // 若遇到指定 key ，则标记删除并返回
      if (this.buckets[j].key === key) {
        this.buckets[j] = this.removed;
        this.size -= 1;
        return;
      }
    }
  }

  /* 扩容哈希表 */
  extend() {
    // 暂存原哈希表
    const bucketsTmp = this.buckets;
    // 初始化扩容后的新哈希表
    this.capacity *= this.extendRatio;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
    // 将键值对从原哈希表搬运至新哈希表
    for (const pair of bucketsTmp) {
      if (pair !== null && pair.key !== this.removed.key) {
        this.put(pair.key, pair.val);
      }
    }
  }

  /* 打印哈希表 */
  print() {
    for (const pair of this.buckets) {
      if (pair !== null) {
        console.log(pair.key + " -> " + pair.val);
      } else {
        console.log("null");
      }
    }
  }
}
