import 'mocha';
import { strict as assert } from 'assert';
import { ConsumerController } from '../../../../src/domain/services/controllers/ConsumerController';
import { ConsumerRepository } from '../../../../src/storage/repository/ConsumerRepository';
import {
  PERMISSION_DENIED,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from '../../../../src/domain/services/controllers/ResponseErrors';

const TEST_CONSUMER_PARAMS_1: string = `{
  "id": "test_id_1",
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "orderZone": "test_order_zone_1"
}`;

const TEST_CONSUMER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "orderZone": "test_order_zone_2"
}`;

const consumerController = new ConsumerController();
const consumerRepository = new ConsumerRepository();

describe('ConsumerController Tests', async () => {

  before(async () => {
    await consumerRepository.initDatastoreObjects();
  });

  afterEach(async () => {
    await consumerRepository.clearEntities();
  });

  after(async () => {
    await consumerRepository.dropEntityCollection();
  });

  describe('createConsumer() tests', async () => {
    it('should create a new consumer', async () => {
      // asserting response
      // function under test
      const controllerResponse = await consumerController
        .createConsumer(TEST_CONSUMER_PARAMS_1);
      assert.equal(controllerResponse, "resource created");
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
        .createConsumer(TEST_CONSUMER_PARAMS_2);
      assert.equal(controllerResponse, "resource created");
      // asserting side effect (inserting consumer to db)
      // function under test
      const consumerString = await consumerController
        .getConsumer('test_id_2');
      assert.deepEqual(
        JSON.parse(consumerString),
        JSON.parse(TEST_CONSUMER_PARAMS_2)
      );
    });

    it('should assert that a consumer already exists', async () => {
      // setup
      await consumerController
        .createConsumer(TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .createConsumer(TEST_CONSUMER_PARAMS_2);
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_ALREADY_EXISTS)
      );
    });
  });

  describe('updateConsumer() tests', async () => {

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
        .createConsumer(TEST_CONSUMER_PARAMS_1);
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
        .createConsumer(TEST_CONSUMER_PARAMS_2);
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
        .createConsumer(TEST_CONSUMER_PARAMS_1);
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
        .createConsumer(TEST_CONSUMER_PARAMS_2);
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
        .createConsumer(TEST_CONSUMER_PARAMS_2);
      // function under test
      const controllerResponse = await consumerController
        .deleteConsumer('test_id_1');
      assert.deepEqual(
        JSON.parse(controllerResponse),
        JSON.parse(RESOURCE_NOT_FOUND)
      );
    });

  });

});
