/* 广度优先遍历 */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
function graphBFS(graph, startVet) {
  // 顶点遍历序列
  const res = [];
  // 哈希集合，用于记录已被访问过的顶点
  const visited = new Set();
  visited.add(startVet);
  // 队列用于实现 BFS
  const que = [startVet];
  // 以顶点 vet 为起点，循环直至访问完所有顶点
  while (que.length) {
      const vet = que.shift(); // 队首顶点出队
      res.push(vet); // 记录访问顶点
      // 遍历该顶点的所有邻接顶点
      for (const adjVet of graph.adjList.get(vet) ?? []) {
          if (visited.has(adjVet)) {
              continue; // 跳过已被访问的顶点
          }
          que.push(adjVet); // 只入队未访问的顶点
          visited.add(adjVet); // 标记该顶点已被访问
      }
  }
  // 返回顶点遍历序列
  return res;
}