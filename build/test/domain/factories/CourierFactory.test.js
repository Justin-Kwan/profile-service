"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const CourierFactory_1 = require("../../../src/domain/factories/CourierFactory");
const courierFactory = new CourierFactory_1.CourierFactory();
const TEST_COURIER_1 = {
    id: "test_id_1",
    firstName: "test_first_name_1",
    lastName: "test_last_name_1",
    email: "test_email_1",
    country: "test_country_1",
    locationId: "test_location_id_1",
    mobileNum: "test_mobile_num_1",
    timeCreated: "test_time_created_1",
    vehicleType: "test_vehicle_type_1"
};
const TEST_COURIER_2 = {
    id: "test_id_2",
    firstName: "test_first_name_2",
    lastName: "test_last_name_2",
    email: "test_email_2",
    country: "test_country_2",
    locationId: "test_location_id_2",
    mobileNum: "test_mobile_num_2",
    timeCreated: "test_time_created_2",
    vehicleType: "test_vehicle_type_2"
};
describe('CourierFactory Tests', () => {
    describe('createNew() Tests', () => {
        it('should create a courier object', () => {
            const courier = courierFactory.createNew('test_id_1', `{
        "firstName": "test_first_name_1",
        "lastName": "test_last_name_1",
        "email": "test_email_1",
        "country": "test_country_1",
        "locationId": "test_location_id_1",
        "mobileNum": "test_mobile_num_1",
        "vehicleType": "test_vehicle_type_1"
      }`);
            // asserting object type equality
            assert_1.strict.equal(courier.constructor.name, 'Courier');
            assert_1.strict.equal(courier.getId(), TEST_COURIER_1.id);
            assert_1.strict.equal(courier.getFirstName(), TEST_COURIER_1.firstName);
            assert_1.strict.equal(courier.getLastName(), TEST_COURIER_1.lastName);
            assert_1.strict.equal(courier.getEmail(), TEST_COURIER_1.email);
            assert_1.strict.equal(courier.getCountry(), TEST_COURIER_1.country);
            assert_1.strict.equal(courier.getLocationId(), TEST_COURIER_1.locationId);
            assert_1.strict.equal(courier.getMobileNum(), TEST_COURIER_1.mobileNum);
            assert_1.strict.equal(courier.getVehicleType(), TEST_COURIER_1.vehicleType);
            assert_1.strict(courier.getTimeCreated() !== null);
            assert_1.strict.equal(courier.isVerified(), false);
        });
        it('should create a courier object', () => {
            const courier = courierFactory.createNew('test_id_2', `{
        "firstName": "test_first_name_2",
        "lastName": "test_last_name_2",
        "email": "test_email_2",
        "country": "test_country_2",
        "locationId": "test_location_id_2",
        "mobileNum": "test_mobile_num_2",
        "vehicleType": "test_vehicle_type_2"
        }`);
            // asserting object type equality
            assert_1.strict.equal(courier.constructor.name, 'Courier');
            assert_1.strict.equal(courier.getId(), TEST_COURIER_2.id);
            assert_1.strict.equal(courier.getFirstName(), TEST_COURIER_2.firstName);
            assert_1.strict.equal(courier.getLastName(), TEST_COURIER_2.lastName);
            assert_1.strict.equal(courier.getEmail(), TEST_COURIER_2.email);
            assert_1.strict.equal(courier.getCountry(), TEST_COURIER_2.country);
            assert_1.strict.equal(courier.getLocationId(), TEST_COURIER_2.locationId);
            assert_1.strict.equal(courier.getMobileNum(), TEST_COURIER_2.mobileNum);
            assert_1.strict.equal(courier.getVehicleType(), TEST_COURIER_2.vehicleType);
            assert_1.strict(courier.getTimeCreated() !== null);
            assert_1.strict.equal(courier.isVerified(), false);
        });
    });
});
