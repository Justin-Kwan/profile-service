import 'mocha';
import { strict as assert } from 'assert';
import {
  ConsumerController
} from '../../../../src/domain/services/controllers/ConsumerController';

const TEST_CONSUMER_PARAMS_1: string = `{
  "id": "test_id_1",
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "address": "test_address_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "city": "test_city_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "orderZone": "test_order_zone_1"
}`;

describe('ConsumerController Tests', async () => {

  const consumerController = new ConsumerController();

  it('should create a new consumer', async () => {
    const controllerResponse = await consumerController.createConsumer(TEST_CONSUMER_PARAMS_1);
    assert.equal(controllerResponse, "resource created");
  });

  

});
