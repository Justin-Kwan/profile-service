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
const CourierRepository_1 = require("../../../src/storage/repository/CourierRepository");
const CourierSerializer_1 = require("../../../src/domain/user-serializers/CourierSerializer");
const courierRepository = new CourierRepository_1.CourierRepository();
const courierSerializer = new CourierSerializer_1.CourierSerializer();
const TEST_COURIER_PARAMS_1 = `{
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
  "vehicleType": "test_vehicle_type_1",
  "inviteCode": "test_invite_code_1"
}`;
const TEST_COURIER_PARAMS_2 = `{
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
  "vehicleType": "test_vehicle_type_2",
  "inviteCode": "test_invite_code_2"
}`;
describe('CourierRepository tests', () => {
    before(async () => {
        await courierRepository.initDatastoreObjects();
    });
    afterEach(async () => {
        await courierRepository.clear();
    });
    after(async () => {
        await courierRepository.dropCollection();
    });
    describe('select() tests', () => {
        it('should select correct courier', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            await courierRepository.insert(courier);
            const selectedCourier = await courierRepository.select('test_id_1');
            // assert type and field equality of objects
            assert_1.strict(_.isEqual(expectedCourier, selectedCourier));
        });
        it('should select correct courier', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_2);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_2);
            await courierRepository.insert(courier);
            const selectedCourier = await courierRepository.select('test_id_2');
            // assert type and field equality of objects
            assert_1.strict(_.isEqual(expectedCourier, selectedCourier));
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const selectedCourier = async () => {
                await courierRepository.select('non_existent_id');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            await courierRepository.insert(courier);
            const selectedCourier = async () => {
                await courierRepository.select('test_id_2');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_2);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_2);
            await courierRepository.insert(courier);
            const selectedCourier = async () => {
                await courierRepository.select('test_id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            await courierRepository.insert(courier);
            const selectedCourier = async () => {
                await courierRepository.select(' test_id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            await courierRepository.insert(courier);
            const selectedCourier = async () => {
                await courierRepository.select('test_id_1 ');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
        it('should throw error since no courier to select (invalid id)', async () => {
            const expectedCourier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            const courier = courierSerializer.deserialize(TEST_COURIER_PARAMS_1);
            await courierRepository.insert(courier);
            const selectedCourier = async () => {
                await courierRepository.select('test_ id_1');
            };
            // assert promise rejection is thrown
            assert_1.strict.rejects(selectedCourier, Error);
        });
    });
});
