import Vehicle from "./vehicle";

export default class Ship extends Vehicle {
  constructor({
    name,
    countOfTeam,
    model,
    producedYear,
    capacity,
    averageSpeed
  }) {
    super(model, producedYear, capacity, averageSpeed);
    this.name = name;
    this.countOfTeam = countOfTeam;
  }

  showAverageSpeed() {
    console.log(`Average speed is ${this.averageSpeed}nm.`);
  }
}
