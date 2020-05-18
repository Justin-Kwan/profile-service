"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUserRepository = void 0;
const MongoStore_1 = require("../../../src/storage/database/MongoStore");
const RedisStore_1 = require("../../../src/storage/cache/RedisStore");
const UserRepository_1 = require("../../../src/storage/repository/UserRepository");
const MockUserSerializer_1 = require("../../domain/user-serializers/MockUserSerializer");
/**
 * mock repository class for testing abstract Repository class
 */
class MockUserRepository extends UserRepository_1.UserRepository {
    constructor() {
        const TEST_DATABASE = 'Test_Database';
        const TEST_COLLECTION = 'Test Collection';
        // injecting datastore and user dependencies to
        // base repository class
        super(new MongoStore_1.MongoStore(TEST_DATABASE, TEST_COLLECTION), new RedisStore_1.RedisStore(), new MockUserSerializer_1.MockUserSerializer());
    }
}
exports.MockUserRepository = MockUserRepository;
