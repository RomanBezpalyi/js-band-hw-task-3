import EVENT_EMITTER from "./services/event-emitter";
import collectionTypes from "./constants/collectionTypes";

export default class Model {
  constructor(vehicles = [], costs = []) {
    this.vehicles = vehicles;
    this.costs = costs;
  }

  getItemsFromLS() {
    try {
      if (localStorage.vehicles)
        this.vehicles = JSON.parse(
          localStorage.getItem(collectionTypes.VEHICLES)
        );
      if (localStorage.costs)
        this.costs = JSON.parse(localStorage.getItem(collectionTypes.COSTS));
    } catch (e) {
      console.error("Error while parsing.");
    }
  }

  addItem(item, list) {
    this[list].push(item);
    EVENT_EMITTER.emit("add-to-model", this.vehicles, this.costs);
    return item;
  }
}
