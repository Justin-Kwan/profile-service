"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerRepository = void 0;
const UserRepository_1 = require("./UserRepository");
const MongoStore_1 = require("../database/MongoStore");
const RedisStore_1 = require("../cache/RedisStore");
const ConsumerSerializer_1 = require("../../domain/user-serializers/ConsumerSerializer");
class ConsumerRepository extends UserRepository_1.UserRepository {
    constructor() {
        const USER_DATABASE = 'User_Profiles';
        const CONSUMER_COLLECTION = 'Consumers';
        // injecting datastore and user dependencies to
        // base repository class
        super(new MongoStore_1.MongoStore(USER_DATABASE, CONSUMER_COLLECTION), new RedisStore_1.RedisStore(), new ConsumerSerializer_1.ConsumerSerializer());
    }
}
exports.ConsumerRepository = ConsumerRepository;
