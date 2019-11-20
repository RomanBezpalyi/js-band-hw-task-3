import EVENT_EMITTER from "./services/event-emitter";
import VehicleFactory from "./classes/vehicle-factory";
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

    const target = e.target;
    const item = {};
    let inst;

    if (target.name !== "costs") {
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
      case collectionTypes.TRUCKS:
        const license = target.querySelector(".license");
        const typeOfGas = target.querySelector(".gas");

        item.licensePlate = license.value;
        item.typeOfGas = typeOfGas.value;

        inst = new VehicleFactory.create(target.name, item);
        break;
      case collectionTypes.SHIPS:
        const name = target.querySelector(".name");
        const countOfTeam = target.querySelector(".team");

        item.name = name.value;
        item.countOfTeam = countOfTeam.value;

        inst = new VehicleFactory.create(target.name, item);
        break;
      case collectionTypes.COSTS:
        const radios = target.querySelectorAll(".type");
        const model = Array.from(radios).find(radio => radio.checked);
        const costByCargo = target.querySelector(".cargo");
        const costByDistance = target.querySelector(".distance");

        item.model = model.value;
        item.costByCargo = costByCargo.value;
        item.costByDistance = costByDistance.value;

        inst = new Cost(item);
        break;
      default:
        return;
    }

    EVENT_EMITTER.emit("add-via-view", inst);
    target.reset();
  }

  createDOMElement(tag, text, ...classes) {
    const element = document.createElement(tag);
    text ? (element.textContent = text) : null;
    classes.forEach(className => element.classList.add(className));
    return element;
  }

  createItem(type, item) {
    const li = this.createDOMElement("li", null, "vehicle-list__li");
    const itemToAdd = this.createDOMElement("div", null, "item");

    const modelTitle = this.createDOMElement("h3", "Model:", "item__title");
    const model = this.createDOMElement("p", item.model, "item__text");
    const modelWrapper = this.createDOMElement("div", null, "item__wrapper");
    modelWrapper.append(modelTitle, model);
    itemToAdd.append(modelWrapper);

    if (type === collectionTypes.COSTS) {
      const costByCargoTitle = this.createDOMElement(
        "h3",
        "Cost by 1 kg of cargo:",
        "item__title"
      );
      const costByCargo = this.createDOMElement(
        "p",
        `${item.costByCargo}$`,
        "item__text"
      );

      const costByDistanceTitle = this.createDOMElement(
        "h3",
        "Cost by 1 km of distance:",
        "item__title"
      );
      const costByDistance = this.createDOMElement(
        "p",
        `${item.costByDistance}$`,
        "item__text"
      );

      const cargoWrapper = modelWrapper.cloneNode(false);
      const distanceWrapper = modelWrapper.cloneNode(false);

      modelWrapper.append(modelTitle, model);
      cargoWrapper.append(costByCargoTitle, costByCargo);
      distanceWrapper.append(costByDistanceTitle, costByDistance);

      itemToAdd.append(modelWrapper, cargoWrapper, distanceWrapper);
    } else {
      const yearTitle = this.createDOMElement(
        "h3",
        "Produced year:",
        "item__title"
      );
      const year = this.createDOMElement("p", item.producedYear, "item__text");
      const yearWrapper = this.createDOMElement("div", null, "item__wrapper");
      yearWrapper.append(yearTitle, year);

      const capacityTitle = this.createDOMElement(
        "h3",
        "Capacity:",
        "item__title"
      );
      const capacity = this.createDOMElement(
        "p",
        `${item.capacity}kg`,
        "item__text"
      );
      const capacityWrapper = this.createDOMElement(
        "div",
        null,
        "item__wrapper"
      );
      capacityWrapper.append(capacityTitle, capacity);

      const speedTitle = this.createDOMElement(
        "h3",
        "Average speed:",
        "item__title"
      );
      const speed = this.createDOMElement(
        "p",
        `${item.averageSpeed}${type === "trucks" ? "km" : "nm"}`,
        "item__text"
      );
      const speedWrapper = this.createDOMElement("div", null, "item__wrapper");
      speedWrapper.append(speedTitle, speed);

      switch (type) {
        case collectionTypes.TRUCKS:
          const licenseTitle = this.createDOMElement(
            "h3",
            "License Plate:",
            "item__title"
          );
          const license = this.createDOMElement(
            "p",
            item.licensePlate,
            "item__text"
          );
          const licenseWrapper = this.createDOMElement(
            "div",
            null,
            "item__wrapper"
          );
          licenseWrapper.append(licenseTitle, license);

          const gasTitle = this.createDOMElement(
            "h3",
            "Type of gas:",
            "item__title"
          );
          const gas = this.createDOMElement("p", item.typeOfGas, "item__text");
          const gasWrapper = this.createDOMElement(
            "div",
            null,
            "item__wrapper"
          );
          gasWrapper.append(gasTitle, gas);
          itemToAdd.append(
            licenseWrapper,
            yearWrapper,
            capacityWrapper,
            speedWrapper,
            gasWrapper
          );
          break;

        case collectionTypes.SHIPS:
          const nameTitle = this.createDOMElement("h3", "Name:", "item__title");
          const name = this.createDOMElement("p", item.name, "item__text");
          const nameWrapper = this.createDOMElement(
            "div",
            null,
            "item__wrapper"
          );
          nameWrapper.append(nameTitle, name);

          const teamTitle = this.createDOMElement(
            "h3",
            "Count of team:",
            "item__title"
          );
          const team = this.createDOMElement(
            "p",
            item.countOfTeam,
            "item__text"
          );
          const teamWrapper = this.createDOMElement(
            "div",
            null,
            "item__wrapper"
          );
          teamWrapper.append(teamTitle, team);
          itemToAdd.append(
            nameWrapper,
            yearWrapper,
            capacityWrapper,
            speedWrapper,
            teamWrapper
          );
          break;
        default:
          return;
      }
    }

    li.append(itemToAdd);

    return li;
  }

  handleCancel(e) {
    e.target.reset();
  }

  init(vehicles, costs) {
    this.vehicleList.innerHTML = "";
    this.costList.innerHTML = "";

    const vehiclesToAdd = vehicles.map(vehicle => {
      const type = vehicle.hasOwnProperty("licensePlate")
        ? collectionTypes.TRUCKS
        : collectionTypes.SHIPS;
      return this.createItem(type, vehicle);
    });
    const costsToAdd = costs.map(cost =>
      this.createItem(collectionTypes.COSTS, cost)
    );

    this.vehicleList.append(...vehiclesToAdd);
    this.costList.append(...costsToAdd);
  }
}
