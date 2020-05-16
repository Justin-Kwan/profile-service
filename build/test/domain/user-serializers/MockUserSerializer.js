"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUserSerializer = void 0;
const MockUser_1 = require("../entities/users/MockUser");
class MockUserSerializer {
    deserialize(userString) {
        const userObj = JSON.parse(userString);
        const mockUser = new MockUser_1.MockUser();
        mockUser.setId(userObj.id);
        mockUser.setFirstName(userObj.firstName);
        mockUser.setLastName(userObj.lastName);
        mockUser.setEmail(userObj.email);
        mockUser.setCountry(userObj.country);
        mockUser.setLocationId(userObj.locationId);
        mockUser.setMobileNum(userObj.mobileNum);
        mockUser.setTimeCreated(userObj.timeCreated);
        mockUser.setVerificationStatus(userObj.verificationStatus);
        return mockUser;
    }
    serializeForClient(mockUser) {
        return {
            firstName: mockUser.getFirstName(),
            lastName: mockUser.getLastName(),
            email: mockUser.getEmail(),
            country: mockUser.getCountry(),
            locationId: mockUser.getLocationId(),
            mobileNum: mockUser.getMobileNum()
        };
    }
}
exports.MockUserSerializer = MockUserSerializer;
