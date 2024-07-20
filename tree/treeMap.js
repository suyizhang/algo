const { Tree } = require("./binary_search_tree");

// Map:
// 	set(key, value)
// 	get(key) -> value
// 	contains(key) -> bool
// 	forEach(func)

// // O(log N)
// TreeMap: Map
// 	rangeFor(firstKey, lastKey, func)

class TreeMap {
  constructor() {
    this.tree = new Tree();
  }

  set(key, value) {
    this.tree.insert(key, value);
  }

  get(key) {
    return this.tree.find(key)?.data?.value;
  }

  contains(key) {
    return !!this.tree.find(key);
  }

  rangeFor(firstKey, lastKey, func) {
    if (!this.tree.root) return;

    let cur = this.tree.root.lowerBound(firstKey);
    while(cur && cur.data.key <= lastKey ) {
      func(cur.data.key, cur.data.value);
      cur = cur.next();
    }

  }

  forEach(func) {
    if (!this.tree.root) return;
    let cur = this.tree.root.min();
    while(cur) {
      func(cur.data.key);
      cur = cur.next();
    }
  }
}


function test () {
  const map = new TreeMap();
  for (let i = 0; i < 10; i++) {
    map.set(i, i);
  }
  // console.log(map.root.next().data.key);
  // console.log(map.find(2).next().data.key);
  // console.log(map.find(5).prev().data.key);
  // console.log(map.find(7).prev().data.key);

  map.rangeFor(2, 15, console.log)
  // map.rangeFor(6, 9, console.log)
  // map.forEach(console.log);
}

test();

module.exports = {
  TreeMap,
};