"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierRepository = void 0;
const UserRepository_1 = require("./UserRepository");
const MongoStore_1 = require("../database/MongoStore");
const RedisStore_1 = require("../cache/RedisStore");
const CourierSerializer_1 = require("../../domain/user-serializers/CourierSerializer");
class CourierRepository extends UserRepository_1.UserRepository {
    constructor() {
        const USER_DATABASE = 'User_Profiles';
        const COURIER_COLLECTION = 'Couriers';
        // injecting datastore and user dependencies to
        // base repository class
        super(new MongoStore_1.MongoStore(USER_DATABASE, COURIER_COLLECTION), new RedisStore_1.RedisStore(), new CourierSerializer_1.CourierSerializer());
    }
}
exports.CourierRepository = CourierRepository;
