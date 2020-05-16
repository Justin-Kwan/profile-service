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
        this.setPreferredZone(courierParams.preferredZone);
    }
    setVehicleType(vehicleType) {
        this.vehicleType = vehicleType;
    }
    setPreferredZone(preferredZone) {
        this.preferredZone = preferredZone;
    }
    getVehicleType() {
        return this.vehicleType;
    }
    getPreferredZone() {
        return this.preferredZone;
    }
}
exports.Courier = Courier;
