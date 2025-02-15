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

export function findRoute(graph: Graph, from: string, to: string): string[] {
  let work = [{at: from, route: <string[]>[]}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }

  return [];
}