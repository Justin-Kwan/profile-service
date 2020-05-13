import 'mocha';
import { strict as assert } from 'assert';

import { ConsumerFactory } from '../../../../src/domain/entities/factories/ConsumerFactory';
import { Consumer } from '../../../../src/domain/entities/users/Consumer';

const test_consumer_1: any = {
  id: 'test_id_1',
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1',
  country: 'test_country_1',
  locationId: 'test_location_id_1',
  mobileNum: 'test_mobile_num_1',
  orderZone: 'test_order_zone_1'
};

const test_consumer_2: any = {
  id: 'test_id_2',
  firstName: 'test_first_name_2',
  lastName: 'test_last_name_2',
  email: 'test_email_2',
  country: 'test_country_2',
  locationId: 'test_location_id_2',
  mobileNum: 'test_mobile_num_2',
  orderZone: 'test_order_zone_2'
}

const consumerFactory = new ConsumerFactory();

const REPOSITORY_CALLER = 'repository';

describe('ConsumerFactory Tests', () => {

  describe('createNewConsumer() tests', () => {
    it('should create a consumer object', () => {
      const consumer: Consumer = consumerFactory.createNewConsumer(
      'test_id_1',
      `{
        "firstName": "test_first_name_1",
        "lastName": "test_last_name_1",
        "email": "test_email_1",
        "country": "test_country_1",
        "locationId": "test_location_id_1",
        "mobileNum": "test_mobile_num_1",
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
      assert.equal(consumer.getOrderZone(), test_consumer_1.orderZone);
      assert(consumer.getTimeCreated() !== null);
      assert.equal(consumer.isVerified(), false);
    });

    it('should create a consumer object', () => {
      const consumer: Consumer = consumerFactory.createNewConsumer(
      'test_id_2',
      `{
        "firstName": "test_first_name_2",
        "lastName": "test_last_name_2",
        "email": "test_email_2",
        "country": "test_country_2",
        "zipCode": "test_zip_code_2",
        "locationId": "test_location_id_2",
        "mobileNum": "test_mobile_num_2",
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
      assert.equal(consumer.getOrderZone(), test_consumer_2.orderZone);
      assert(consumer.getTimeCreated() !== null);
      assert.equal(consumer.isVerified(), false);
    });
  });

});
