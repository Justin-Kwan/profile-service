"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierService = void 0;
const UserService_1 = require("./UserService");
const CourierRepository_1 = require("../../storage/repository/CourierRepository");
const CourierFactory_1 = require("../factories/CourierFactory");
const CourierSerializer_1 = require("../user-serializers/CourierSerializer");
class CourierService extends UserService_1.UserService {
    constructor() {
        super(new CourierRepository_1.CourierRepository(), new CourierFactory_1.CourierFactory(), new CourierSerializer_1.CourierSerializer());
    }
}
exports.CourierService = CourierService;
