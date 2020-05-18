"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUser = void 0;
const User_1 = require("../../../../src/domain/entities/users/User");
/**
 * mock user class for testing abstract User class
 */
class MockUser extends User_1.User {
    constructor() {
        super();
    }
    updateFields(userParams) {
    }
}
exports.MockUser = MockUser;
