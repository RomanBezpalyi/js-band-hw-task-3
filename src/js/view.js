import EVENT_EMITTER from "./services/EventEmitter";
import VehicleFactory from "./classes/VehicleFactory";
import Cost from "./classes/Cost";
import collectionTypes from "./constants/collectionTypes";

export default class View {
  constructor() {
    // QUERY SELECTORS

    this.forms = document.querySelector(".form-list");
    this.vehicleList = document.querySelector(".vehicle-list");
    this.costList = document.querySelector(".cost-list");

    // EVENT LISTENERS

    EVENT_EMITTER.on("add-to-model", this.init.bind(this));
    this.forms.addEventListener("submit", this.handleAdd.bind(this));
    this.forms.addEventListener("reset", this.handleCancel.bind(this));
  }

  handleAdd(e) {
    e.preventDefault();

    const { target } = e;
    const item = {};

    if (target.name !== collectionTypes.COSTS) {
      const model = target.querySelector(".model");
      const producedYear = target.querySelector(".year");
      const capacity = target.querySelector(".capacity");
      const averageSpeed = target.querySelector(".speed");

      item.model = model.value;
      item.producedYear = producedYear.value;
      item.capacity = capacity.value;
      item.averageSpeed = averageSpeed.value;
    }

    switch (target.name) {
      case collectionTypes.TRUCKS: {
        const license = target.querySelector(".license");
        const typeOfGas = target.querySelector(".gas");

        item.licensePlate = license.value;
        item.typeOfGas = typeOfGas.value;
        break;
      }

      case collectionTypes.SHIPS: {
        const name = target.querySelector(".name");
        const countOfTeam = target.querySelector(".team");

        item.name = name.value;
        item.countOfTeam = countOfTeam.value;
        break;
      }

      case collectionTypes.COSTS: {
        const radios = target.querySelectorAll(".type");
        const model = [...radios].find(radio => radio.checked);
        const costByCargo = target.querySelector(".cargo");
        const costByDistance = target.querySelector(".distance");

        item.model = model.value;
        item.costByCargo = costByCargo.value;
        item.costByDistance = costByDistance.value;
        break;
      }

      default:
        return;
    }
    const inst =
      target.name === collectionTypes.COSTS
        ? new Cost(item)
        : VehicleFactory.create(target.name, item);

    EVENT_EMITTER.emit("add-via-view", inst);
    target.reset();
  }

  createDOMElement(tag, text, ...classes) {
    const element = document.createElement(tag);
    text ? (element.textContent = text) : null;
    classes.forEach(className => element.classList.add(className));
    return element;
  }

  createWrapperWithChildren(title, text) {
    const childTitle = this.createDOMElement("h3", title, "item__title");
    const childText = this.createDOMElement("p", text, "item__text");
    const wrapper = this.createDOMElement("div", null, "item__wrapper");

    wrapper.append(childTitle, childText);
    return wrapper;
  }

  createCost(item) {
    const cargoWrapper = this.createWrapperWithChildren(
      "Cost by 1 kg of cargo:",
      `${item.costByCargo}$`
    );
    const distanceWrapper = this.createWrapperWithChildren(
      "Cost by 1 km of distance:",
      `${item.costByDistance}$`
    );

    return [cargoWrapper, distanceWrapper];
  }

  createVehicle(type, item) {
    const licenseNameWrapper = this.createWrapperWithChildren(
      type === collectionTypes.TRUCKS ? "License Plate:" : "Name:",
      type === collectionTypes.TRUCKS ? item.licensePlate : item.name
    );

    const yearWrapper = this.createWrapperWithChildren(
      "Produced year:",
      item.producedYear
    );

    const capacityWrapper = this.createWrapperWithChildren(
      "Capacity:",
      `${item.capacity}kg`
    );

    const speedWrapper = this.createWrapperWithChildren(
      "Average speed:",
      `${item.averageSpeed}${type === collectionTypes.TRUCKS ? "km" : "nm"}`
    );

    const gasTeamWrapper = this.createWrapperWithChildren(
      type === collectionTypes.TRUCKS ? "Type of gas:" : "Count of team:",
      type === collectionTypes.TRUCKS ? item.typeOfGas : item.countOfTeam
    );

    return [
      licenseNameWrapper,
      yearWrapper,
      capacityWrapper,
      speedWrapper,
      gasTeamWrapper
    ];
  }

  createListItem(type, item) {
    const li = this.createDOMElement("li", null, "vehicle-list__li");
    const itemToAdd = this.createDOMElement("div", null, "item");

    const modelWrapper = this.createWrapperWithChildren("Model:", item.model);
    const innerWrappers =
      type === collectionTypes.COSTS
        ? this.createCost(item)
        : this.createVehicle(type, item);

    itemToAdd.append(modelWrapper, ...innerWrappers);
    li.appendChild(itemToAdd);

    return li;
  }

  handleCancel({ target }) {
    target.reset();
  }

  init(vehicles, costs) {
    this.vehicleList.innerHTML = "";
    this.costList.innerHTML = "";

    const vehiclesToAdd = vehicles.map(vehicle => {
      const type = Object.prototype.hasOwnProperty.call(vehicle, "licensePlate")
        ? collectionTypes.TRUCKS
        : collectionTypes.SHIPS;
      return this.createListItem(type, vehicle);
    });
    const costsToAdd = costs.map(cost =>
      this.createListItem(collectionTypes.COSTS, cost)
    );

    this.vehicleList.append(...vehiclesToAdd);
    this.costList.append(...costsToAdd);
  }
}
