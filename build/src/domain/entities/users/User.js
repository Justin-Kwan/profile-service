"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
        this.verificationStatus = false;
    }
    setId(id) {
        this.id = id;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    setEmail(email) {
        this.email = email;
    }
    setCountry(country) {
        this.country = country;
    }
    setLocationId(locationId) {
        this.locationId = locationId;
    }
    setMobileNum(mobileNum) {
        this.mobileNum = mobileNum;
    }
    setTimeCreated(timeCreated) {
        this.timeCreated = timeCreated;
    }
    setVerificationStatus(verificationStatus) {
        this.verificationStatus = verificationStatus;
    }
    flagAsVerified() {
        this.verificationStatus = true;
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getCountry() {
        return this.country;
    }
    getLocationId() {
        return this.locationId;
    }
    getMobileNum() {
        return this.mobileNum;
    }
    getTimeCreated() {
        return this.timeCreated;
    }
    isVerified() {
        return this.verificationStatus;
    }
}
exports.User = User;
