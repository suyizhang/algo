const { TreeMap } = require("./treeMap");
// Set:
// 	add(key)
// 	contains(key)
// 	forEach(func)

// // O(log N)
// TreeSet: Set
// 	rangeFor(firstKey, lastKey, func)


class TreeSet {
  constructor() {
    this.map = new TreeMap();
  }

  add (key) {
    this.map.set(key);
  }

  contains(key) {
    return this.map.contains(key);
  }

  rangeFor(firstKey, lastKey, func) {
    this.map.rangeFor(firstKey, lastKey, func);
  }

  forEach(func) {
    this.map.forEach(func);
  }
}