import shortid from "shortid";

export default class Vehicle {
  constructor(model, producedYear, capacity, averageSpeed) {
    this.id = shortid();
    this.model = model;
    this.producedYear = producedYear;
    this.capacity = capacity;
    this.averageSpeed = averageSpeed;
  }

  showAverageSpeed() {
    console.log(`Average speed is ${this.averageSpeed}.`);
  }

  showCapacityInPounds() {
    const KG_TO_POUND = 2.2046;
    console.log(`Capacity in pounds is ${this.capacity * KG_TO_POUND}.`);
  }
}
