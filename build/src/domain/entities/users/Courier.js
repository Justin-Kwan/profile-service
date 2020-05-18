"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courier = void 0;
const User_1 = require("./User");
class Courier extends User_1.User {
    constructor() {
        super();
    }
    updateFields(courierParams) {
        this.setFirstName(courierParams.firstName);
        this.setLastName(courierParams.lastName);
        this.setEmail(courierParams.email);
        this.setCountry(courierParams.country);
        this.setLocationId(courierParams.locationId);
        this.setMobileNum(courierParams.mobileNum);
        this.setVehicleType(courierParams.vehicleType);
    }
    setVehicleType(vehicleType) {
        this.vehicleType = vehicleType;
    }
    getVehicleType() {
        return this.vehicleType;
    }
}
exports.Courier = Courier;
