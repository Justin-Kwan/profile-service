import 'mocha';
import { strict as assert } from 'assert';
import * as _ from 'lodash';;

import { ConsumerRepository } from '../../../src/storage/repository/ConsumerRepository';
import { Consumer } from '../../../src/domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../../src/domain/services/entity-serializers/ConsumerSerializer';

const TEST_CONSUMER_PARAMS_1: string = `{
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

const TEST_CONSUMER_PARAMS_2: string = `{
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

const consumerRepository = new ConsumerRepository();
const consumerSerializer = new ConsumerSerializer();

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
      assert(_.isEqual(expectedConsumer, selectedConsumer));
    });

    it('should select correct consumer', async () => {
      const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      await consumerRepository.insert(consumer);
      const selectedConsumer = await consumerRepository.select('test_id_2');
      // assert type and field equality of objects
      assert(_.isEqual(expectedConsumer, selectedConsumer));
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const selectedConsumer = async () => {
        await consumerRepository.select('non_existent_id');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      const selectedConsumer = async () => {
        await consumerRepository.select('test_id_2');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      await consumerRepository.insert(consumer);
      const selectedConsumer = async () => {
        await consumerRepository.select('test_id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1, );
      await consumerRepository.insert(consumer);
      const selectedConsumer = async () => {
        await consumerRepository.select(' test_id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const expectedConsumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      const selectedConsumer = async () => {
        await consumerRepository.select('test_id_1 ');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });

    it('should throw error since no consumer to select (invalid id)', async () => {
      const expectedConsumer = consumerSerializer
        .deserialize(TEST_CONSUMER_PARAMS_1);
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      const selectedConsumer = async () => {
        await consumerRepository.select('test_ id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(selectedConsumer, Error);
    });
  });

  describe('existByEmail() tests', () => {
    it('should assert that consumer with same email exists collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      const doesConsumerExist = await consumerRepository
        .existByEmail('test_email_1');
      assert.equal(doesConsumerExist, true);
    });

    it('should assert that consumer with same email exists collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      await consumerRepository.insert(consumer);
      const doesConsumerExist = await consumerRepository
        .existByEmail('test_email_2');
      assert.equal(doesConsumerExist, true);
    });

    it('should assert that consumer with same email does not exist collection', async () => {
      let doesConsumerExist: boolean = await consumerRepository
        .existByEmail('non_existent_user_email');
      assert.equal(doesConsumerExist, false);
    });

    it('should assert that consumer with same email does not exist collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByEmail(' test_email_1');
      assert.equal(doesConsumerExist, false);
    });

    it('should assert that consumer with same email does not exist collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByEmail('test_email_1 ');
      assert.equal(doesConsumerExist, false);
    });

    it('should assert that consumer with same email does not exist collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByEmail('test_ email_1');
      assert.equal(doesConsumerExist, false);
    });
  });

  describe('existByMobileNum() tests', () => {
    it('should assert that consumer with same mobile number exists in collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByMobileNum('test_mobile_num_1');
      assert.equal(doesConsumerExist, true);
    });

    it('should assert that consumer with same mobile number exists in collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByMobileNum('test_mobile_num_2');
      assert.equal(doesConsumerExist, true);
    });

    it('should assert that consumer with same mobile number does not exist in collection', async () => {
      let doesConsumerExist: boolean = await consumerRepository
        .existByMobileNum('non_existent_user_mobile_num');
      assert.equal(doesConsumerExist, false);
    });

    it('should assert that consumer with same mobile number does not exist in collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_1);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByMobileNum('test_mobile_num_2');
      assert.equal(doesConsumerExist, false);
    });

    it('should assert that consumer with same mobile number does not exist in collection', async () => {
      const consumer = consumerSerializer.deserialize(TEST_CONSUMER_PARAMS_2);
      await consumerRepository.insert(consumer);
      let doesConsumerExist: boolean = await consumerRepository
        .existByMobileNum('test_mobile_num_1');
      assert.equal(doesConsumerExist, false);
    });
  });

});
