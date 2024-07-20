/**
 *
图的构成
节点 (node)
边 (edge)
图的分类
无向图 (undirected graph): 边无方向 有向图 (directed graph): 边有方向
图的表示
邻接矩阵 (适合密集矩阵)
对于一个有 M 个节点的图, 用一个 MxM 的二维数组 arr 表示 arr[i][j] == 1 表示存在节点 i -> 节点 j 的边 对于无向图, arr[i][j] == arr[j][i]
邻接链表
对于一个有 M 个节点的图, 用一个长度 M 的数组 arr 表示
arr[i] 是一个链表, 链表中的每个元素 j 表示存在节点 i -> 节点 j 的边
Node key
neighbors // 相连的节点 Edge
    // node_a.key < node_b.key
    node_a
    node_b
UndirectedGraph
nodes // 一个 hashmap: key -> node edges // 一个 hashset: (key_a, key_b)
    add_node(key)
    get_node(key)
    remove_node(key)
    add_edge(key_a, key_b)
    get_edge(key_a, key_b)
    remove_edge(key_a, key_b)
 */
const { HashMap, HashSet } = require("../tree/hash_table");

class Node {
  constructor(key) {
    this.key = key;
    this.neighbors = [];
  }
}

class Edge {
}

class UndirectedGraph {
  constructor() {
    this.nodes = new HashMap(10);
    this.edges = new HashSet(10);
  }

  add_node(key) {
    const node = this.get_node(key);
    if (node) {
      return node;
    }
    const new_node = new Node(key);
    this.nodes.set(key, new_node);
    return new_node;
  }

  get_node(key) {
    return this.nodes.get(key)?.value;
  }

  remove_node(key) {
    const node = this.get_node(key);
    if (!node) {
      return;
    }

    node.neighbors.forEach((neighbor) => {
      this.remove_edge(node.key, neighbor.key);
    });

    this.nodes.remove(key);
  }

  _arrange(key_a, key_b) {
    if (key_a > key_b) {
      return [key_b, key_a];
    }
    return [key_a, key_b];
  }

  add_edge(key_a, key_b) {
    [key_a, key_b] = this._arrange(key_a, key_b);
    const node_a = this.add_node(key_a);
    const node_b = this.add_node(key_b);

    if (this.get_edge(key_a, key_b)) {
      return;
    }

    node_a.neighbors.push(node_b);
    node_b.neighbors.push(node_a);

    this.edges.add([key_a, key_b]);
  }

  get_edge(key_a, key_b) {
    [key_a, key_b] = this._arrange(key_a, key_b);

    return this.edges.get([key_a, key_b]);
  }

  remove_edge(key_a, key_b) {
    [key_a, key_b] = this._arrange(key_a, key_b);

    if (!this.get_edge(key_a, key_b)) {
      return;
    }

    this.edges.remove([key_a, key_b]);

    this.get_node(key_a).neighbors = this.get_node(key_a).neighbors.filter(
      (v) => v.key !== this.get_node(key_b).key
    );
    this.get_node(key_b).neighbors = this.get_node(key_b).neighbors.filter(
      (v) => v.key !== this.get_node(key_a).key
    );
  }

  print() {
    this.nodes.forEach(node => {
      console.log('node:', node.key);
      node.value.neighbors.forEach(neighbor => {
        console.log(neighbor.key);
      })            
    })
  }
}

function graph_test() {
  const graph = new UndirectedGraph();
  graph.add_node(1);
  graph.add_node(2);
  graph.add_node(3);
  graph.add_node(4);
  graph.add_node(5);

  console.log(graph.get_node(3));

  graph.add_edge(1, 2);

  console.log(graph.get_edge(1, 2));

  graph.add_edge(2, 3);
  graph.add_edge(1, 3);
  graph.add_edge(1, 5);
  graph.add_edge(4, 5);
  graph.add_edge(3, 5);
  graph.add_edge(3, 4);
  graph.remove_node(1);
  graph.print();
}

graph_test();
