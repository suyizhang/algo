/* 基于邻接表实现的无向图类 */
class GraphAdjList {
  // 邻接表，key：顶点，value：该顶点的所有邻接顶点
  adjList;

  /* 构造方法 */
  constructor(edges) {
      this.adjList = new Map();
      // 添加所有顶点和边
      for (const edge of edges) {
          this.addVertex(edge[0]);
          this.addVertex(edge[1]);
          this.addEdge(edge[0], edge[1]);
      }
  }

  /* 获取顶点数量 */
  size() {
      return this.adjList.size;
  }

  /* 添加边 */
  addEdge(vet1, vet2) {
      if (
          !this.adjList.has(vet1) ||
          !this.adjList.has(vet2) ||
          vet1 === vet2
      ) {
          throw new Error('Illegal Argument Exception');
      }
      // 添加边 vet1 - vet2
      this.adjList.get(vet1).push(vet2);
      this.adjList.get(vet2).push(vet1);
  }

  /* 删除边 */
  removeEdge(vet1, vet2) {
      if (
          !this.adjList.has(vet1) ||
          !this.adjList.has(vet2) ||
          vet1 === vet2
      ) {
          throw new Error('Illegal Argument Exception');
      }
      // 删除边 vet1 - vet2
      this.adjList.get(vet1).splice(this.adjList.get(vet1).indexOf(vet2), 1);
      this.adjList.get(vet2).splice(this.adjList.get(vet2).indexOf(vet1), 1);
  }

  /* 添加顶点 */
  addVertex(vet) {
      if (this.adjList.has(vet)) return;
      // 在邻接表中添加一个新链表
      this.adjList.set(vet, []);
  }

  /* 删除顶点 */
  removeVertex(vet) {
      if (!this.adjList.has(vet)) {
          throw new Error('Illegal Argument Exception');
      }
      // 在邻接表中删除顶点 vet 对应的链表
      this.adjList.delete(vet);
      // 遍历其他顶点的链表，删除所有包含 vet 的边
      for (const set of this.adjList.values()) {
          const index = set.indexOf(vet);
          if (index > -1) {
              set.splice(index, 1);
          }
      }
  }

  /* 打印邻接表 */
  print() {
      console.log('邻接表 =');
      for (const [key, value] of this.adjList) {
          const tmp = [];
          for (const vertex of value) {
              tmp.push(vertex.val);
          }
          console.log(key.val + ': ' + tmp.join());
      }
  }
}