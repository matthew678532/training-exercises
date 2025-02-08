// https://eloquentjavascript.net/07_robot.html

// 1. Setting up our state (graph structure)

const roads: string[] = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

type Graph = {
  [k: string]: string[]
};

function buildGraph(edges: string[]) {
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

const roadGraph = buildGraph(roads);

type Parcel = {
  place: string,
  address: string
};

class VillageState {
  place: string;
  parcels: Parcel[];

  constructor(place: string, parcels: Parcel[]) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination: string) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  static random(parcelCount: number = 5) {
    let parcels: Parcel[] = [];
    for (let i = 0; i < parcelCount; i++) {
      let address: string = randomPick(Object.keys(roadGraph));
      let place: string;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  }
}

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

// console.log(next.place);
// // → Alice's House
// console.log(next.parcels);
// // → []
// console.log(first.place);
// // → Post Office

// 2. Setting up our robot to traverse the graph

// Robot is the function not the output

type Robot = (state: VillageState, memory: unknown) => ({ direction: string, memory: any });

function runRobot(state: VillageState, robot: Robot, memory: any): number {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// 3. Traversing our graph (random orientation)

function randomPick(array: string[]) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state: VillageState, memory: any) {
  return {direction: randomPick(roadGraph[state.place]), memory: memory};
}

console.log("========== Random robot");
runRobot(VillageState.random(), randomRobot, null);

// 4. Traversing the graph (route orientation)

const mailRoute: string[] = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state: VillageState, memory: any) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

console.log("========== Route robot");
runRobot(VillageState.random(), routeRobot, []);

// 5. Traversing the graph (goal orientation)

function findRoute(graph: Graph, from: string, to: string): string[] {
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

function goalOrientedRobot({place, parcels}: VillageState, route: any) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

console.log("========== Goal robot");
runRobot(VillageState.random(), goalOrientedRobot, []);

// 6. Comparing robots

function compareRobots(robot1: Robot, memory1: any, robot2: Robot, memory2: any) {
  let robot1Count = 0;
  let robot2Count = 0;

  for (let i = 0; i < 100; i++) {
    robot1Count += runRobot(VillageState.random(), robot1, memory1);
    robot2Count += runRobot(VillageState.random(), robot2, memory2);
  }

  console.log("Robot 1 average number of steps: ", robot1Count / 100);
  console.log("Robot 2 average number of steps: ", robot2Count / 100);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

// 7. Traversing the graph (goal orientation)

function lazyRobot({place, parcels}: VillageState, route: any) {
  if (route.length == 0) {
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return { route: findRoute(roadGraph, place, parcel.place), pickUp: true };
      } else {
        return { route: findRoute(roadGraph, place, parcel.address), pickUp: false};
      }
    });

    function score({ route, pickUp }: { route: string[], pickUp: boolean}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

console.log("========== Lazy robot");
runRobot(VillageState.random(), lazyRobot, []);

compareRobots(goalOrientedRobot, [], lazyRobot, []);