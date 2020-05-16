"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const _ = __importStar(require("lodash"));
;
const ConsumerRepository_1 = require("../../../src/storage/repository/ConsumerRepository");
const ConsumerSerializer_1 = require("../../../src/domain/user-serializers/ConsumerSerializer");
const TEST_CONSUMER_PARAMS_1 = `{
  "id": "test_id_1",
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "timeCreated": "test_time_created_1",
  "verificationStatus": true,
  "deletionStatus": false,
  "orderZone": "test_order_zone_1"
}`;
const TEST_CONSUMER_PARAMS_2 = `{
  "id": "test_id_2",
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "timeCreated": "test_time_created_2",
  "verificationStatus": true,
  "deletionStatus": false,
  "orderZone": "test_order_zone_2"
}`;
const consumerRepository = new ConsumerRepository_1.ConsumerRepository();
const consumerSerializer = new ConsumerSerializer_1.ConsumerSerializer();
describe('ConsumerRepository tests', () => {
    before(async () => {
        await consumerRepository.initDatastoreObjects();
    });
    afterEach(async () => {
        await consumerRepository.clear();
    });
    after(async () => {
        await consumerRepository.dropCollection();
    });
    describe('select() tests', () => {
        it('should select correct consumer', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            await consumerRepository.insert(consumer);
            const selectedConsumer = await consumerRepository.select('test_id_1');
            // assert type and field equality of objects
            assert_1.strict(_.isEqual(expectedConsumer, selectedConsumer));
        });
        it('should select correct consumer', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
            await consumerRepository.insert(consumer);
            const selectedConsumer = await consumerRepository.select('test_id_2');
            // assert type and field equality of objects
            assert_1.strict(_.isEqual(expectedConsumer, selectedConsumer));
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const selectedConsumer = async () => {
                await consumerRepository.select('non_existent_id');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            await consumerRepository.insert(consumer);
            const selectedConsumer = async () => {
                await consumerRepository.select('test_id_2');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
            await consumerRepository.insert(consumer);
            const selectedConsumer = async () => {
                await consumerRepository.select('test_id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            await consumerRepository.insert(consumer);
            const selectedConsumer = async () => {
                await consumerRepository.select(' test_id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            await consumerRepository.insert(consumer);
            const selectedConsumer = async () => {
                await consumerRepository.select('test_id_1 ');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
        it('should throw error since no consumer to select (invalid id)', async () => {
            const expectedConsumer = consumerSerializer
                .deserialize(TEST_CONSUMER_PARAMS_1);
            const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
            await consumerRepository.insert(consumer);
            const selectedConsumer = async () => {
                await consumerRepository.select('test_ id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedConsumer, Error);
        });
    });
});
