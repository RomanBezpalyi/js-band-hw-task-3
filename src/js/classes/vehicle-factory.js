import collectionTypes from "../constants/collectionTypes";
import Vehicle from "./vehicle";
import Truck from "./truck";
import Ship from "./ship";

export default class VehicleFactory {
  static create(type, object) {
    switch (type) {
      case collectionTypes.TRUCKS:
        return new Truck(object);
      case collectionTypes.SHIPS:
        return new Ship(object);
      default:
        return new Vehicle(object);
    }
  }
}