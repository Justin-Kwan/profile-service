"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerFactory = void 0;
const moment = require("moment");
const Consumer_1 = require("../entities/users/Consumer");
class ConsumerFactory {
    createNew(consumerId, consumerString) {
        const consumerObj = JSON.parse(consumerString);
        const consumer = new Consumer_1.Consumer();
        consumer.setId(consumerId);
        consumer.setFirstName(consumerObj.firstName);
        consumer.setLastName(consumerObj.lastName);
        consumer.setEmail(consumerObj.email);
        consumer.setCountry(consumerObj.country);
        consumer.setLocationId(consumerObj.locationId);
        consumer.setMobileNum(consumerObj.mobileNum);
        consumer.setTimeCreated(moment().format());
        consumer.setVerificationStatus(false);
        return consumer;
    }
}
exports.ConsumerFactory = ConsumerFactory;
