"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
const User_1 = require("./User");
class Consumer extends User_1.User {
    constructor() {
        super();
    }
    updateFields(consumerParams) {
        this.setFirstName(consumerParams.firstName);
        this.setLastName(consumerParams.lastName);
        this.setEmail(consumerParams.email);
        this.setCountry(consumerParams.country);
        this.setLocationId(consumerParams.locationId);
        this.setMobileNum(consumerParams.mobileNum);
    }
}
exports.Consumer = Consumer;
