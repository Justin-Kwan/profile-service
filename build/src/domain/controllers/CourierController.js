"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierController = void 0;
const UserController_1 = require("./UserController");
const CourierService_1 = require("../user-services/CourierService");
class CourierController extends UserController_1.UserController {
    constructor() {
        super(new CourierService_1.CourierService());
    }
}
exports.CourierController = CourierController;
