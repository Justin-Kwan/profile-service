"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierFactory = void 0;
const moment = require("moment");
const Courier_1 = require("../entities/users/Courier");
class CourierFactory {
    createNew(courierId, courierString) {
        const courierObj = JSON.parse(courierString);
        const courier = new Courier_1.Courier();
        courier.setId(courierId);
        courier.setFirstName(courierObj.firstName);
        courier.setLastName(courierObj.lastName);
        courier.setEmail(courierObj.email);
        courier.setCountry(courierObj.country);
        courier.setLocationId(courierObj.locationId);
        courier.setMobileNum(courierObj.mobileNum);
        courier.setVehicleType(courierObj.vehicleType);
        courier.setTimeCreated(moment().format());
        courier.setVerificationStatus(false);
        return courier;
    }
}
exports.CourierFactory = CourierFactory;
