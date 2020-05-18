"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerService = void 0;
const UserService_1 = require("./UserService");
const ConsumerRepository_1 = require("../../storage/repository/ConsumerRepository");
const ConsumerFactory_1 = require("../factories/ConsumerFactory");
const ConsumerSerializer_1 = require("../user-serializers/ConsumerSerializer");
class ConsumerService extends UserService_1.UserService {
    constructor() {
        super(new ConsumerRepository_1.ConsumerRepository(), new ConsumerFactory_1.ConsumerFactory(), new ConsumerSerializer_1.ConsumerSerializer());
    }
}
exports.ConsumerService = ConsumerService;
