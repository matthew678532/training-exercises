export type Graph = {
  [k: string]: string[]
};

export function buildGraph(edges: string[]) {
  let graph: Graph = Object.create(null);
  function addEdge(from: string, to: string) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map((r: string) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}