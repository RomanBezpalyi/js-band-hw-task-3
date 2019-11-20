import EVENT_EMITTER from "./services/event-emitter";
import LOCAL_STORAGE from "./services/local-storage";
import collectionTypes from "./constants/collectionTypes";

export default class Model {
  constructor(vehicles = [], costs = []) {
    this.vehicles = vehicles;
    this.costs = costs;
  }

  getItemsFromLS() {
    this.vehicles = LOCAL_STORAGE.getItems(collectionTypes.VEHICLES) || [];
    this.costs = LOCAL_STORAGE.getItems(collectionTypes.COSTS) || [];
  }

  addItem(item, list) {
    this[list].push(item);
    EVENT_EMITTER.emit("add-to-model", this.vehicles, this.costs);
    return item;
  }
}
