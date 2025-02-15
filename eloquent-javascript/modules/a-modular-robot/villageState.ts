import { type Graph } from "./graph";
import { randomPick } from "./robot";

export type Parcel = {
  place: string,
  address: string
};

export default class VillageState {
  place: string;
  parcels: Parcel[];
  roadGraph: Graph;

  constructor(place: string, parcels: Parcel[], roadGraph: Graph) {
    this.place = place;
    this.parcels = parcels;
    this.roadGraph = roadGraph;
  }

  move(destination: string) {
    if (!this.roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels, this.roadGraph);
    }
  }

  static random(roadGraph: Graph, parcelCount: number = 5) {
    let parcels: Parcel[] = [];
    for (let i = 0; i < parcelCount; i++) {
      let address: string = randomPick(Object.keys(roadGraph));
      let place: string;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels, roadGraph);
  }
}