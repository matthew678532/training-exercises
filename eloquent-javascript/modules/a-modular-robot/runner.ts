import { buildGraph, findRoute } from "./graph";
import { runRobot, randomPick, compareRobots } from "./robot";
import VillageState from "./villageState";

const roads: string[] = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

const roadGraph = buildGraph(roads);

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}],
  roadGraph
);
let next = first.move("Alice's House");


// 1. Random robot

function randomRobot(state: VillageState, memory: any) {
  return {direction: randomPick(roadGraph[state.place]), memory: memory};
}

console.log("========== Random robot");
runRobot(VillageState.random(roadGraph), randomRobot, null);

// 2. Route robot

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
runRobot(VillageState.random(roadGraph), routeRobot, []);

// 3. Goal oriented robot

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
runRobot(VillageState.random(roadGraph), goalOrientedRobot, []);

// 4. Compare robots

console.log("========== Compare robots");
compareRobots(VillageState.random(roadGraph), routeRobot, [], goalOrientedRobot, []);

// 5. Lazy robot

export function lazyRobot({place, parcels}: VillageState, route: any) {
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
runRobot(VillageState.random(roadGraph), lazyRobot, []);

compareRobots(VillageState.random(roadGraph), goalOrientedRobot, [], lazyRobot, []);