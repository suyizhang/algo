class DynamicArray {
  constructor() {
    // 静态数组
    this.array = [];
    //当前元素个数
    this.size = 0;
    //当前容量
    this.capacity = 32;
    // 初始容量
    this.initCapacity = 32;
  }

  insert(i, x) {
    if (i > this.size || i < 0) {
      throw new RangeError('out of range');
    }

    if (this.size === this.capacity) {
      this._extend();
    }
    
    // 向前遍历
    for (let j = this.size;  j > i; j--) {
      this.array[j] = this.array[j - 1];
    }

    this.array[i] = x;
    this.size += 1;
  }

  append(x) {
    this.insert(this.size, x);
  }

  remove(i) {
    if (i < 0 && this.size < i) {
      // 超范围
      throw new RangeError('out of range');
    }
    for (let j = i; j < this.size - 1; j++) {
      this.array[j] = this.array[j + 1];
    }
    this.array[this.size - 1] = -1;
    this.size -= 1;
    // if (this.size * 4 <= this.capacity) {
    //   this._shrink();
    // }
  }

  _extend() {
    // 更新容量
    this._copy(this.capacity * 2);
  }

  // 缩容
  _shrink() {
      if (this.capacity / 2 < this.initCapacity) {
        return;
      }
      this._copy(this.capacity / 2);
  }

  // 主动缩容 将容量设为 size 
  _shrink_to_fit() {
    if (this.initCapacity > this.size) {
      return;
    } 
    this._copy(this.size);
  }

  // 保留容量
  _reserve(new_cap) {
    if (this.capacity < new_cap) {
      this._copy(new_cap);
    }
  }

  _copy(capacity) {
    const data = []; // 创建一个新的静态数组 容量为 capacity
    for (let i = 0; i < this.size; i++) {
      data[i] = this.array[i];
    }
    this.capacity = capacity;
    this.array  = data;
  }

   print() {
    let str = '';
    for (let i = 0; i < this.size; i++) {
       str += ` ${this.array[i]} `
    }

    console.log('aray: %s, size: %d, capacity: %d, initCapacity: %d',`[${str}]`, this.size, this.capacity, this.initCapacity);
  }

  get(i) {
    if (i < 0 || i >= this.size) {
      throw Error('out of range');
    }
    return this.array[i];
  }

  set(i, x) {
    if (i < 0 || i >= this.size) {
      throw Error('out of range');
    }
    
    this.array[i] = x;
  }
}


let a = new DynamicsArray();
// a.insert(0, 1);
// a.insert(0, 2);
// a.insert(0, 3);
// a.insert(0, 4);
// a.append(5);
// a.remove(0);

for (let i = 0; i < 128; i++) {
  a.append(i);
}
a.print();

for (let i = 0; i < 128; i++) {
  a.remove(0);
}

a.print();