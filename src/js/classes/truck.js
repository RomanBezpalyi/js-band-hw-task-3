import Vehicle from "./Vehicle";

export default class Truck extends Vehicle {
  constructor({
    licensePlate,
    typeOfGas,
    model,
    producedYear,
    capacity,
    averageSpeed
  }) {
    super(model, producedYear, capacity, averageSpeed);
    this.licensePlate = licensePlate;
    this.typeOfGas = typeOfGas;
  }

  showAverageSpeed() {
    console.log(`Average speed is ${this.averageSpeed}km.`);
  }
}
