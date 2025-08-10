class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(key) {
    if (this.neighbors.includes(key)) {
      return;
    }
    this.neighbors.push(key);
  }

  removeNeighbor(key) {
    this.neighbors = this.neighbors.filter((v) => v !== key);
  }
}

class Edge {
  constructor(src, dest) {
    this.src = src;
    this.dest = dest;
    this.value = {};
  }
}

class UndirectedGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(key, value) {
    if (this.nodes.has(key)) {
      return;
    }
    const node = new Node(key, value);
    this.nodes.set(key, node);
    return node;
  }

  getNode(key) {
    return this.nodes.get(key);
  }

  removeNode(key) {
    const node = this.getNode(key);
    if (!node) {
      return;
    }
    node.neighbors.forEach((neighbor) => {
      this.getNode(neighbor).removeNeighbor(key);
      this.removeEdge(key, neighbor);
    });
    this.nodes.delete(key);
  }

  addEdge(srcKey, destKey) {
    const [src, dest] = this.sortEdgeKey(srcKey, destKey);
    if (!this.getNode(src) || !this.getNode(dest)) {
      return;
    }
    if (this.getEdge(src, dest)) {
      return;
    }
    const edge = new Edge(src, dest);
    this.edges.set(src + dest, edge);
    this.getNode(src).addNeighbor(dest);
    this.getNode(dest).addNeighbor(src);

    return edge;
  }

  getEdge(srcKey, destKey) {
    const [src, dest] = this.sortEdgeKey(srcKey, destKey);
    return this.edges.get(src + dest);
  }

  removeEdge(srcKey, destKey) {
    const [src, dest] = this.sortEdgeKey(srcKey, destKey);

    if (!this.getEdge(src, dest)) {
      return;
    }
    const leftNode = this.getNode(src);
    const rgihtNode = this.getNode(dest);
    this.edges.delete(src + dest);
    leftNode.removeNeighbor(dest);
    rgihtNode.removeNeighbor(src);
  }

  sortEdgeKey(srcKey, destKey) {
    let src = srcKey,
      dest = destKey;
    if (srcKey > destKey) {
      [src, dest] = [dest, src];
    }
    return [String(src), String(dest)];
  }
}

const graph = new UndirectedGraph();

graph.addNode("1", { a: "123" });
graph.addNode("2", { a: "234" });

graph.getNode("1");

graph.addEdge("2", "1");

graph.removeNode("1");
console.log(graph);
