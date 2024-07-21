/* 初始化数组 */
var arr = new Array(5).fill(0);
var nums = [1, 3, 2, 5, 4];

/* 随机访问元素 */
function randomAccess(nums) {
  // 在区间 [0, nums.length) 中随机抽取一个数字
  const random_index = Math.floor(Math.random() * nums.length);
  // 获取并返回随机元素
  const random_num = nums[random_index];
  return random_num;
}

/* 在数组的索引 index 处插入元素 num */
function insert(nums, num, index) {
  // 把索引 index 以及之后的所有元素向后移动一位
  for (let i = nums.length - 1; i > index; i--) {
    nums[i] = nums[i - 1];
  }
  // 将 num 赋给 index 处的元素
  nums[index] = num;
}

/* 删除索引 index 处的元素 */
function remove(nums, index) {
  // 把索引 index 之后的所有元素向前移动一位
  for (let i = index; i < nums.length - 1; i++) {
    nums[i] = nums[i + 1];
  }
}

/**
 *
 * 时间复杂度高：数组的插入和删除的平均时间复杂度均为  O(n)，其中 n 为数组长度。
 * 丢失元素：由于数组的长度不可变，因此在插入元素后，超出数组长度范围的元素会丢失。
 * 内存浪费：我们可以初始化一个比较长的数组，只用前面一部分，这样在插入数据时，丢失的末尾元素都是“无意义”的，但这样做会造成部分内存空间浪费。
 *
 */


/* 遍历数组 */
function traverse(nums) {
  let count = 0;
  // 通过索引遍历数组
  for (let i = 0; i < nums.length; i++) {
      count += nums[i];
  }
  // 直接遍历数组元素
  for (const num of nums) {
      count += num;
  }
}

/* 在数组中查找指定元素 */
function find(nums, target) {
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) return i;
  }
  return -1;
}

/* 扩展数组长度 */
// 请注意，JavaScript 的 Array 是动态数组，可以直接扩展
// 为了方便学习，本函数将 Array 看作长度不可变的数组
function extend(nums, enlarge) {
  // 初始化一个扩展长度后的数组
  const res = new Array(nums.length + enlarge).fill(0);
  // 将原数组中的所有元素复制到新数组
  for (let i = 0; i < nums.length; i++) {
      res[i] = nums[i];
  }
  // 返回扩展后的新数组
  return res;
}


/**
 * 
 *  数组的优点与局限性¶
数组存储在连续的内存空间内，且元素类型相同。这种做法包含丰富的先验信息，系统可以利用这些信息来优化数据结构的操作效率。

空间效率高：数组为数据分配了连续的内存块，无须额外的结构开销。
支持随机访问：数组允许在 
 时间内访问任何元素。
缓存局部性：当访问数组元素时，计算机不仅会加载它，还会缓存其周围的其他数据，从而借助高速缓存来提升后续操作的执行速度。
连续空间存储是一把双刃剑，其存在以下局限性。

插入与删除效率低：当数组中元素较多时，插入与删除操作需要移动大量的元素。
长度不可变：数组在初始化后长度就固定了，扩容数组需要将所有数据复制到新数组，开销很大。
空间浪费：如果数组分配的大小超过实际所需，那么多余的空间就被浪费了。
 * 
 */