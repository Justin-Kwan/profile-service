"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerSerializer = void 0;
const Consumer_1 = require("../entities/users/Consumer");
class ConsumerSerializer {
    /**
     * deserializes consumer json string into consumer object, copying
     * all fields
     * @param {string}
     * @return {Consumer}
     */
    deserialize(consumerString) {
        const consumerObj = JSON.parse(consumerString);
        const consumer = new Consumer_1.Consumer();
        consumer.setId(consumerObj.id);
        consumer.setFirstName(consumerObj.firstName);
        consumer.setLastName(consumerObj.lastName);
        consumer.setEmail(consumerObj.email);
        consumer.setCountry(consumerObj.country);
        consumer.setLocationId(consumerObj.locationId);
        consumer.setMobileNum(consumerObj.mobileNum);
        consumer.setOrderZone(consumerObj.orderZone);
        consumer.setTimeCreated(consumerObj.timeCreated);
        consumer.setVerificationStatus(consumerObj.verificationStatus);
        return consumer;
    }
    /**
     * serializes consumer object into json string, filtering
     * out sensitive fields for web client
     * @param {Consumer}
     * @return {string}
     */
    serializeForClient(consumer) {
        return {
            id: consumer.getId(),
            firstName: consumer.getFirstName(),
            lastName: consumer.getLastName(),
            email: consumer.getEmail(),
            country: consumer.getCountry(),
            locationId: consumer.getLocationId(),
            mobileNum: consumer.getMobileNum(),
            orderZone: consumer.getOrderZone(),
            verificationStatus: consumer.isVerified()
        };
    }
}
exports.ConsumerSerializer = ConsumerSerializer;
