import 'mocha';
import { strict as assert } from 'assert';

import { CourierFactory } from '../../../src/domain/factories/CourierFactory';
import { Courier } from '../../../src/domain/entities/users/Courier';

const courierFactory = new CourierFactory();

const test_courier_1: any = {
  id: "test_id_1",
  firstName: "test_first_name_1",
  lastName: "test_last_name_1",
  email: "test_email_1",
  country: "test_country_1",
  locationId: "test_location_id_1",
  mobileNum: "test_mobile_num_1",
  timeCreated: "test_time_created_1",
  vehicleType: "test_vehicle_type_1",
  preferredZone: "test_preferred_zone_1"
}

const test_courier_2: any = {
  id: "test_id_2",
  firstName: "test_first_name_2",
  lastName: "test_last_name_2",
  email: "test_email_2",
  country: "test_country_2",
  locationId: "test_location_id_2",
  mobileNum: "test_mobile_num_2",
  timeCreated: "test_time_created_2",
  vehicleType: "test_vehicle_type_2",
  preferredZone: "test_preferred_zone_2"
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
        "vehicleType": "test_vehicle_type_1",
        "preferredZone": "test_preferred_zone_1"
      }`);
      // asserting object type equality
      assert.equal(courier.constructor.name, 'Courier');
      assert.equal(courier.getId(), test_courier_1.id);
      assert.equal(courier.getFirstName(), test_courier_1.firstName);
      assert.equal(courier.getLastName(), test_courier_1.lastName);
      assert.equal(courier.getEmail(), test_courier_1.email);
      assert.equal(courier.getCountry(), test_courier_1.country);
      assert.equal(courier.getLocationId(), test_courier_1.locationId);
      assert.equal(courier.getMobileNum(), test_courier_1.mobileNum);
      assert.equal(courier.getVehicleType(), test_courier_1.vehicleType);
      assert.equal(courier.getPreferredZone(), test_courier_1.preferredZone);
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
        "vehicleType": "test_vehicle_type_2",
        "preferredZone": "test_preferred_zone_2"
        }`);
      // asserting object type equality
      assert.equal(courier.constructor.name, 'Courier');
      assert.equal(courier.getId(), test_courier_2.id);
      assert.equal(courier.getFirstName(), test_courier_2.firstName);
      assert.equal(courier.getLastName(), test_courier_2.lastName);
      assert.equal(courier.getEmail(), test_courier_2.email);
      assert.equal(courier.getCountry(), test_courier_2.country);
      assert.equal(courier.getLocationId(), test_courier_2.locationId);
      assert.equal(courier.getMobileNum(), test_courier_2.mobileNum);
      assert.equal(courier.getVehicleType(), test_courier_2.vehicleType);
      assert.equal(courier.getPreferredZone(), test_courier_2.preferredZone);
      assert(courier.getTimeCreated() !== null);
      assert.equal(courier.isVerified(), false);
    });
  });

});
