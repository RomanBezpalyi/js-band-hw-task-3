import EVENT_EMITTER from "./services/event-emitter";
import Cost from "./classes/cost";
import collectionTypes from "./constants/collectionTypes";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.getItemsFromLS();
    this.view.init(this.model.vehicles, this.model.costs);

    EVENT_EMITTER.on("add-via-view", this.addItem.bind(this));
  }

  addItem(item) {
    const listType =
      item instanceof Cost ? collectionTypes.COSTS : collectionTypes.VEHICLES;

    this.model.addItem(item, listType);
    try {
      localStorage.setItem(`${listType}`, JSON.stringify(this.model[listType]));
    } catch (e) {
      console.error("Error while parsing.");
    }
  }
}
