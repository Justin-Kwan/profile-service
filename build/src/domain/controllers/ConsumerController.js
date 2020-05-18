"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerController = void 0;
const UserController_1 = require("./UserController");
const ConsumerService_1 = require("../user-services/ConsumerService");
class ConsumerController extends UserController_1.UserController {
    constructor() {
        super(new ConsumerService_1.ConsumerService());
    }
}
exports.ConsumerController = ConsumerController;
