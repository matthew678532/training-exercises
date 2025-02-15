import VillageState from "./villageState";

export type Robot = (state: VillageState, memory: unknown) => ({ direction: string, memory: any });

export function runRobot(state: VillageState, robot: Robot, memory: any): number {
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

export function randomPick(array: string[]) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

export function compareRobots(state: VillageState, robot1: Robot, memory1: any, robot2: Robot, memory2: any) {
  let robot1Count = 0;
  let robot2Count = 0;

  for (let i = 0; i < 100; i++) {
    robot1Count += runRobot(state, robot1, memory1);
    robot2Count += runRobot(state, robot2, memory2);
  }

  console.log("Robot 1 average number of steps: ", robot1Count / 100);
  console.log("Robot 2 average number of steps: ", robot2Count / 100);
}