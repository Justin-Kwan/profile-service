import 'mocha';
import { strict as assert } from 'assert';

import { ConsumerController } from '../../../../src/domain/services/controllers/ConsumerController';
import { ConsumerRepository } from '../../../../src/storage/repository/ConsumerRepository';
import {
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from '../../../../src/domain/services/controllers/ResponseConstants';

const TEST_CONSUMER_PARAMS_1: string = `{
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "orderZone": "test_order_zone_1"
}`;

const TEST_CONSUMER_PARAMS_SAME_EMAIL_1: string = `{
  "firstName": "same_email_test_first_name_1",
  "lastName": "same_email_test_last_name_1",
  "email": "test_email_1",
  "country": "same_email_test_country_1",
  "locationId": "same_email_test_location_id_1",
  "mobileNum": "same_email_test_mobile_num_1",
  "orderZone": "same_email_test_order_zone_1"
}`;

const TEST_CONSUMER_PARAMS_SAME_MOBILE_NUM_1: string = `{
  "firstName": "same_mobile_num_test_first_name_1",
  "lastName": "same_mobile_num_test_last_name_1",
  "email": "same_mobile_num_test_email_1",
  "country": "same_mobile_num_test_country_1",
  "locationId": "same_mobile_num_test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "orderZone": "same_mobile_num_test_order_zone_1"
}`;

const TEST_CONSUMER_PARAMS_UPDATED_1: string = `{
  "firstName": "updated_test_first_name_1",
  "lastName": "updated_test_last_name_1",
  "email": "updated_test_email_1",
  "country": "updated_test_country_1",
  "locationId": "updated_test_location_id_1",
  "mobileNum": "updated_test_mobile_num_1",
  "orderZone": "updated_test_order_zone_1"
}`;

const TEST_CONSUMER_PARAMS_2: string = `{
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "orderZone": "test_order_zone_2"
}`;

const TEST_CONSUMER_PARAMS_UPDATED_2: string = `{
  "firstName": "updated_test_first_name_2",
  "lastName": "updated_test_last_name_2",
  "email": "updated_test_email_2",
  "country": "updated_test_country_2",
  "locationId": "updated_test_location_id_2",
  "mobileNum": "updated_test_mobile_num_2",
  "orderZone": "updated_test_order_zone_2"
}`;

const consumerController = new ConsumerController();
const consumerRepository = new ConsumerRepository();

describe('ConsumerController Tests', async () => {

  before(async () => {
    await consumerRepository.initDatastoreObjects();
  });

  afterEach(async () => {
    await consumerRepository.clear();
  });

  after(async () => {
    await consumerRepository.dropCollection();
  });

  describe('createConsumer() tests', async () => {
    it('should create a new consumer', async () => {
      // asserting response
      // function under test
      const controllerResponse = await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      assert.equal(controllerResponse, RESOURCE_CREATED);
      // asserting side effect (inserting consumer to db)
      // function under test
      const consumerString = await consumerController
        .getConsumer('test_id_1');
      assert.deepEqual(
        JSON.parse(consumerString),
        JSON.parse(TEST_CONSUMER_PARAMS_1)
      );
    });

    it('should create a new consumer', async () => {
      // asserting response
      // function under test
      const controllerResponse = await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      assert.equal(controllerResponse, RESOURCE_CREATED);
      // asserting side effect (inserting consumer to db)
      // function under test
      const consumerString = await consumerController
        .getConsumer('test_id_2');
      assert.deepEqual(
        JSON.parse(consumerString),
        JSON.parse(TEST_CONSUMER_PARAMS_2)
      );
    });

    it('should assert that a consumer with same id already exists', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController.createConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_2
      );
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_ID_ALREADY_EXISTS)
      );
    });

    it('should assert that a consumer with same email already exists', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      // function under test
      const controllerResponse = await consumerController.createConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_EMAIL_ALREADY_EXISTS)
      );
    });

    it('should assert that a consumer with same mobile number already exists', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      // function under test
      const controllerResponse = await consumerController.createConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_MOBILE_NUM_ALREADY_EXISTS)
      );
    });
  });

  describe('updateConsumer() tests', async () => {
    it('should update a single consumer with all different fields', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_UPDATED_1)
      );
    });

    it('should update a single consumer with all different fields', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_2
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_UPDATED_2
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_UPDATED_2)
      );
    });

    it('should update a single consumer, keeping same email', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_SAME_EMAIL_1)
      );
    });

    it('should update a single consumer, keeping same mobile number', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_SAME_MOBILE_NUM_1)
      );
    });

    it('should update a single consumer, keeping all same fields', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_1)
      );
    });

    it('should update a single consumer with all different fields, without affecting other consumers', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      await consumerController.createConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_2
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      // assert consumer is updated
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_UPDATED_1)
      );
      const unaffectedConsumer = await consumerController
        .getConsumer('test_id_2');
      // assert other consumer is unaffected
      assert.deepEqual(
        JSON.parse(unaffectedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_2)
      );
    });

    it('should update a single consumer with all different fields, without affecting other consumers', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      await consumerController.createConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_2
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_UPDATED_2
      );
      // assert consumer is updated
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_UPDATED_2)
      );
      const unaffectedConsumer = await consumerController
        .getConsumer('test_id_1');
      // assert other consumer is unaffected
      assert.deepEqual(
        JSON.parse(unaffectedConsumer),
        JSON.parse(TEST_CONSUMER_PARAMS_1)
      );
    });

    it('should assert that resource is not found', async () => {
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'non_existent_id',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'test_id_2',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    // creating two users with different emails, then
    // updating one of the users to have same email as the other
    it('should assert that a consumer with same email already exists', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      await consumerController.createConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(RESOURCE_EMAIL_ALREADY_EXISTS)
      );
    });

    // creating two users with different mobile numbers, then
    // updating one of the users to have same mobile number as the other
    it('should assert that a consumer with same email already exists', async () => {
      // setup
      await consumerController.createConsumer(
        'test_id_1',
        TEST_CONSUMER_PARAMS_1
      );
      await consumerController.createConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_UPDATED_1
      );
      // function under test
      const updatedConsumer = await consumerController.updateConsumer(
        'new_test_id_1',
        TEST_CONSUMER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        JSON.parse(updatedConsumer),
        JSON.parse(RESOURCE_MOBILE_NUM_ALREADY_EXISTS)
      );
    });
  });

  describe('getConsumer() tests', async () => {
    it('should assert that resource is not found', async () => {
      // function under test
      const controllerResponse = await consumerController
        .getConsumer('test_id_1');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      // function under test
      const controllerResponse = await consumerController
        .getConsumer('test_id_2');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .getConsumer('test_id_1');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });
  });

  describe('deleteConsumer() tests', async () => {
    it('should assert that resource is not found', async () => {
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('non_existent_id');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_2');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_1');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

    it('should delete a single consumer', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_1');
      const doesDeletedConsumerExist = await consumerController
        .doesConsumerExist('test_id_1');
      assert.equal(doesDeletedConsumerExist, false);
    });

    it('should delete a single consumer', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_2');
      const doesDeletedConsumerExist = await consumerController
        .doesConsumerExist('test_id_2');
      assert.equal(doesDeletedConsumerExist, false);
    });

    it('should delete a single consumer without affecting other consumers', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_2');
      assert.equal(controllerResponse, RESOURCE_DELETED);
      const doesDeletedConsumerExist = await consumerController
        .doesConsumerExist('test_id_2');
      assert.equal(doesDeletedConsumerExist, false);
      const doesConsumerExist = await consumerController
        .doesConsumerExist('test_id_1');
      assert.equal(doesConsumerExist, true);
    });

    it('should delete a single consumer without affecting other consumers', async () => {
      // setup
      await consumerController
        .createConsumer('test_id_1', TEST_CONSUMER_PARAMS_1);
      await consumerController
        .createConsumer('test_id_2', TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_1');
      assert.equal(controllerResponse, RESOURCE_DELETED);
      const doesDeletedConsumerExist = await consumerController
        .doesConsumerExist('test_id_1');
      assert.equal(doesDeletedConsumerExist, false);
      const doesConsumerExist = await consumerController
        .doesConsumerExist('test_id_2');
      assert.equal(doesConsumerExist, true);
    });
  });

});
