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
  constructor(left, right) {
    this.left = left;
    this.right = right;
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

  addEdge(leftKey, rightKey) {
    const [left, right] = this.sortEdgeKey(leftKey, rightKey);
    if (!this.getNode(left) || !this.getNode(right)) {
      return;
    }
    if (this.getEdge(left, right)) {
      return;
    }
    const edge = new Edge(left, right);
    this.edges.set(left + right, edge);
    this.getNode(left).addNeighbor(right);
    this.getNode(right).addNeighbor(left);

    return edge;
  }

  getEdge(leftKey, rightKey) {
    const [left, right] = this.sortEdgeKey(leftKey, rightKey);
    return this.edges.get(left + right);
  }

  removeEdge(leftKey, rightKey) {
    const [left, right] = this.sortEdgeKey(leftKey, rightKey);

    if (!this.getEdge(left, right)) {
      return;
    }
    const leftNode = this.getNode(left);
    const rgihtNode = this.getNode(right);
    this.edges.delete(left + right);
    leftNode.removeNeighbor(right);
    rgihtNode.removeNeighbor(left);
  }

  sortEdgeKey(leftKey, rightKey) {
    let left = leftKey,
      right = rightKey;
    if (leftKey > rightKey) {
      [left, right] = [right, left];
    }
    return [String(left), String(right)];
  }
}

const graph = new UndirectedGraph();

graph.addNode("1", { a: "123" });
graph.addNode("2", { a: "234" });

graph.getNode("1");

graph.addEdge("2", "1");

graph.removeNode("1");
console.log(graph);
