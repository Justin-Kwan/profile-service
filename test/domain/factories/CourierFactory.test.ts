import 'mocha';
import { strict as assert } from 'assert';

import { CourierFactory } from '../../../src/domain/factories/CourierFactory';
import { Courier } from '../../../src/domain/entities/users/Courier';

const courierFactory = new CourierFactory();

const TEST_COURIER_1: any = {
  id: "test_id_1",
  firstName: "test_first_name_1",
  lastName: "test_last_name_1",
  email: "test_email_1",
  country: "test_country_1",
  locationId: "test_location_id_1",
  mobileNum: "test_mobile_num_1",
  timeCreated: "test_time_created_1",
  vehicleType: "test_vehicle_type_1"
}

const TEST_COURIER_2: any = {
  id: "test_id_2",
  firstName: "test_first_name_2",
  lastName: "test_last_name_2",
  email: "test_email_2",
  country: "test_country_2",
  locationId: "test_location_id_2",
  mobileNum: "test_mobile_num_2",
  timeCreated: "test_time_created_2",
  vehicleType: "test_vehicle_type_2"
}

describe('CourierFactory Tests', () => {

  describe('createNew() Tests', () => {
    it('should create a courier object', () => {
      const courier = courierFactory.createNew(
        'test_id_1',
        `{
        "firstName": "test_first_name_1",
        "lastName": "test_last_name_1",
        "email": "test_email_1",
        "country": "test_country_1",
        "locationId": "test_location_id_1",
        "mobileNum": "test_mobile_num_1",
        "vehicleType": "test_vehicle_type_1"
      }`);
      // asserting object type equality
      assert.equal(courier.constructor.name, 'Courier');
      assert.equal(courier.getId(), TEST_COURIER_1.id);
      assert.equal(courier.getFirstName(), TEST_COURIER_1.firstName);
      assert.equal(courier.getLastName(), TEST_COURIER_1.lastName);
      assert.equal(courier.getEmail(), TEST_COURIER_1.email);
      assert.equal(courier.getCountry(), TEST_COURIER_1.country);
      assert.equal(courier.getLocationId(), TEST_COURIER_1.locationId);
      assert.equal(courier.getMobileNum(), TEST_COURIER_1.mobileNum);
      assert.equal(courier.getVehicleType(), TEST_COURIER_1.vehicleType);
      assert(courier.getTimeCreated() !== null);
      assert.equal(courier.isVerified(), false);
    });

    it('should create a courier object', () => {
      const courier = courierFactory.createNew(
        'test_id_2',
        `{
        "firstName": "test_first_name_2",
        "lastName": "test_last_name_2",
        "email": "test_email_2",
        "country": "test_country_2",
        "locationId": "test_location_id_2",
        "mobileNum": "test_mobile_num_2",
        "vehicleType": "test_vehicle_type_2"
        }`);
      // asserting object type equality
      assert.equal(courier.constructor.name, 'Courier');
      assert.equal(courier.getId(), TEST_COURIER_2.id);
      assert.equal(courier.getFirstName(), TEST_COURIER_2.firstName);
      assert.equal(courier.getLastName(), TEST_COURIER_2.lastName);
      assert.equal(courier.getEmail(), TEST_COURIER_2.email);
      assert.equal(courier.getCountry(), TEST_COURIER_2.country);
      assert.equal(courier.getLocationId(), TEST_COURIER_2.locationId);
      assert.equal(courier.getMobileNum(), TEST_COURIER_2.mobileNum);
      assert.equal(courier.getVehicleType(), TEST_COURIER_2.vehicleType);
      assert(courier.getTimeCreated() !== null);
      assert.equal(courier.isVerified(), false);
    });
  });

});
