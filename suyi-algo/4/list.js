/* 初始化列表 */
// 无初始值
const nums1 = [];
// 有初始值
const nums = [1, 3, 2, 5, 4];

/* 访问元素 */
const num = nums[1];  // 访问索引 1 处的元素

/* 更新元素 */
nums[1] = 0;  // 将索引 1 处的元素更新为 0


/* 清空列表 */
nums.length = 0;

/* 在尾部添加元素 */
nums.push(1);
nums.push(3);
nums.push(2);
nums.push(5);
nums.push(4);

/* 在中间插入元素 */
nums.splice(3, 0, 6); // 在索引 3 处插入数字 6

/* 删除元素 */
nums.splice(3, 1);  // 删除索引 3 处的元素


/* 通过索引遍历列表 */
let count = 0;
for (let i = 0; i < nums.length; i++) {
    count += nums[i];
}

/* 直接遍历列表元素 */
count = 0;
for (const num of nums) {
    count += num;
}

/* 拼接两个列表 */
const nums2 = [6, 8, 7, 10, 9];
nums.push(...nums2);  // 将列表 nums2 拼接到 nums 之后

/* 排序列表 */
nums.sort((a, b) => a - b);  // 排序后，列表元素从小到大排列

/* 列表类 */
class MyList {
  #arr = new Array(); // 数组（存储列表元素）
  #capacity = 10; // 列表容量
  #size = 0; // 列表长度（当前元素数量）
  #extendRatio = 2; // 每次列表扩容的倍数

  /* 构造方法 */
  constructor() {
      this.#arr = new Array(this.#capacity);
  }

  /* 获取列表长度（当前元素数量）*/
  size() {
      return this.#size;
  }

  /* 获取列表容量 */
  capacity() {
      return this.#capacity;
  }

  /* 访问元素 */
  get(index) {
      // 索引如果越界，则抛出异常，下同
      if (index < 0 || index >= this.#size) throw new Error('索引越界');
      return this.#arr[index];
  }

  /* 更新元素 */
  set(index, num) {
      if (index < 0 || index >= this.#size) throw new Error('索引越界');
      this.#arr[index] = num;
  }

  /* 在尾部添加元素 */
  add(num) {
      // 如果长度等于容量，则需要扩容
      if (this.#size === this.#capacity) {
          this.extendCapacity();
      }
      // 将新元素添加到列表尾部
      this.#arr[this.#size] = num;
      this.#size++;
  }

  /* 在中间插入元素 */
  insert(index, num) {
      if (index < 0 || index >= this.#size) throw new Error('索引越界');
      // 元素数量超出容量时，触发扩容机制
      if (this.#size === this.#capacity) {
          this.extendCapacity();
      }
      // 将索引 index 以及之后的元素都向后移动一位
      for (let j = this.#size - 1; j >= index; j--) {
          this.#arr[j + 1] = this.#arr[j];
      }
      // 更新元素数量
      this.#arr[index] = num;
      this.#size++;
  }

  /* 删除元素 */
  remove(index) {
      if (index < 0 || index >= this.#size) throw new Error('索引越界');
      let num = this.#arr[index];
      // 将将索引 index 之后的元素都向前移动一位
      for (let j = index; j < this.#size - 1; j++) {
          this.#arr[j] = this.#arr[j + 1];
      }
      // 更新元素数量
      this.#size--;
      // 返回被删除的元素
      return num;
  }

  /* 列表扩容 */
  extendCapacity() {
      // 新建一个长度为原数组 extendRatio 倍的新数组，并将原数组复制到新数组
      this.#arr = this.#arr.concat(
          new Array(this.capacity() * (this.#extendRatio - 1))
      );
      // 更新列表容量
      this.#capacity = this.#arr.length;
  }

  /* 将列表转换为数组 */
  toArray() {
      let size = this.size();
      // 仅转换有效长度范围内的列表元素
      const arr = new Array(size);
      for (let i = 0; i < size; i++) {
          arr[i] = this.get(i);
      }
      return arr;
  }
}