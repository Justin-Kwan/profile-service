import 'mocha';
import { strict as assert } from 'assert';

import { ConsumerFactory } from '../../../../src/domain/entities/factories/ConsumerFactory';
import { Consumer } from '../../../../src/domain/entities/users/Consumer';

const test_consumer_1: any = {
  id: 'test_id_1',
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  address: 'test_address_1',
  email: 'test_email_1',
  country: 'test_country_1',
  city: 'test_city_1',
  zipCode: 'test_zip_code_1',
  locationId: 'test_location_id_1',
  mobileNum: 'test_mobile_num_1',
  timeCreated: 'test_time_created_1',
  verificationStatus: true,
  deletionStatus: false,
  orderZone: 'test_order_zone_1'
};

const test_consumer_2: any = {
  id: 'test_id_2',
  firstName: 'test_first_name_2',
  lastName: 'test_last_name_2',
  address: 'test_address_2',
  email: 'test_email_2',
  country: 'test_country_2',
  city: 'test_city_2',
  zipCode: 'test_zip_code_2',
  locationId: 'test_location_id_2',
  mobileNum: 'test_mobile_num_2',
  timeCreated: 'test_time_created_2',
  verificationStatus: true,
  deletionStatus: false,
  orderZone: 'test_order_zone_2'
}

const consumerFactory = new ConsumerFactory();

const REPOSITORY_CALLER = 'repository';

describe('ConsumerFactory Tests', () => {

  describe('getNewConsumer() tests', () => {
    it('should create a consumer object', () => {
      const consumer: Consumer = consumerFactory.getNewConsumer(`{
        "id": "test_id_1",
        "firstName": "test_first_name_1",
        "lastName": "test_last_name_1",
        "address": "test_address_1",
        "email": "test_email_1",
        "country": "test_country_1",
        "city": "test_city_1",
        "zipCode": "test_zip_code_1",
        "locationId": "test_location_id_1",
        "mobileNum": "test_mobile_num_1",
        "timeCreated": "test_time_created_1",
        "verificationStatus": true,
        "deletionStatus": false,
        "orderZone": "test_order_zone_1"
      }`);
      // asserting object type equality
      assert.equal(consumer.constructor.name, 'Consumer');
      assert.equal(consumer.getId(), test_consumer_1.id);
      assert.equal(consumer.getFirstName(), test_consumer_1.firstName);
      assert.equal(consumer.getLastName(), test_consumer_1.lastName);
      assert.equal(consumer.getEmail(), test_consumer_1.email);
      assert.equal(consumer.getCountry(), test_consumer_1.country);
      assert.equal(consumer.getLocationId(), test_consumer_1.locationId);
      assert.equal(consumer.getMobileNum(), test_consumer_1.mobileNum);
      assert.equal(consumer.getTimeCreated(), test_consumer_1.timeCreated);
      assert.equal(consumer.isVerified(), test_consumer_1.verificationStatus);
      assert.equal(consumer.isDeleted(), test_consumer_1.deletionStatus);
      assert.equal(consumer.getOrderZone(), test_consumer_1.orderZone);
    });

    it('should create a consumer object', () => {
      const consumer: Consumer = consumerFactory.getNewConsumer(`{
        "id": "test_id_2",
        "firstName": "test_first_name_2",
        "lastName": "test_last_name_2",
        "address": "test_address_2",
        "email": "test_email_2",
        "country": "test_country_2",
        "city": "test_city_2",
        "zipCode": "test_zip_code_2",
        "locationId": "test_location_id_2",
        "mobileNum": "test_mobile_num_2",
        "timeCreated": "test_time_created_2",
        "verificationStatus": true,
        "deletionStatus": false,
        "orderZone": "test_order_zone_2"
      }`);
      // asserting object type equality
      assert.equal(consumer.constructor.name, 'Consumer');
      assert.equal(consumer.getId(), test_consumer_2.id);
      assert.equal(consumer.getFirstName(), test_consumer_2.firstName);
      assert.equal(consumer.getLastName(), test_consumer_2.lastName);
      assert.equal(consumer.getEmail(), test_consumer_2.email);
      assert.equal(consumer.getCountry(), test_consumer_2.country);
      assert.equal(consumer.getLocationId(), test_consumer_2.locationId);
      assert.equal(consumer.getMobileNum(), test_consumer_2.mobileNum);
      assert.equal(consumer.getTimeCreated(), test_consumer_2.timeCreated);
      assert.equal(consumer.isVerified(), test_consumer_2.verificationStatus);
      assert.equal(consumer.isDeleted(), test_consumer_2.deletionStatus);
      assert.equal(consumer.getOrderZone(), test_consumer_2.orderZone);
    });
  });

});
