import 'mocha';
import { strict as assert } from 'assert';

import { MockRepository } from './MockRepository';
import { MockUserFactory } from '../../domain/entities/factories/MockUserFactory';
import { MockUser } from '../../domain/entities/users/MockUser';
import { MongoStore } from '../../../src/storage/database/MongoStore';

const mockRepository = new MockRepository();
const mockUserFactory = new MockUserFactory();
const TEST_DB = 'Test_Database';
const TEST_COLLECTION = 'Test Collection';
const mongoStore = new MongoStore<MockUser>(TEST_DB, TEST_COLLECTION);

const TEST_USER_PARAMS_1: string = `{
  "id": "test_id_1",
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "address": "test_address_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "timeCreated": "test_time_created_1",
  "verificationStatus": true,
  "deletionStatus": false
}`;

const TEST_USER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "address": "test_address_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "timeCreated": "test_time_created_2",
  "verificationStatus": true,
  "deletionStatus": false
}`;

const TEST_UPDATED_USER_PARAMS_1: string = `{
  "id": "test_id_1",
  "firstName": "updated_test_first_name_1",
  "lastName": "updated_test_last_name_1",
  "address": "updated_test_address_1",
  "email": "updated_test_email_1",
  "country": "updated_test_country_1",
  "locationId": "updated_test_location_id_1",
  "mobileNum": "updated_test_mobile_num_1",
  "timeCreated": "updated_test_time_created_1",
  "verificationStatus": false,
  "deletionStatus": true
}`;

const TEST_UPDATED_USER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "updated_test_first_name_2",
  "lastName": "updated_test_last_name_2",
  "address": "updated_test_address_2",
  "email": "updated_test_email_2",
  "country": "updated_test_country_2",
  "locationId": "updated_test_location_id_2",
  "mobileNum": "updated_test_mobile_num_2",
  "timeCreated": "updated_test_time_created_2",
  "verificationStatus": false,
  "deletionStatus": true
}`;

const TEST_EMAIL_UPDATED_USER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "address": "test_address_2",
  "email": "updated_test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "timeCreated": "test_time_created_2",
  "verificationStatus": true,
  "deletionStatus": false
}`;

const TEST_FIRST_NAME_UPDATED_USER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "updated_test_first_name_2",
  "lastName": "test_last_name_2",
  "address": "test_address_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "timeCreated": "test_time_created_2",
  "verificationStatus": true,
  "deletionStatus": false
}`;


/**
 * unit testing abstract Repository class via mock repository object
 */
describe('Repository tests', () => {

  before(async () => {
    await mockRepository.initDatastoreObjects();
  });

  afterEach(async () => {
    await mockRepository.clearEntities();
  });

  after(async () => {
    await mockRepository.dropEntityCollection();
  });

  describe('insertNewEntity() tests', () => {
    it('should insert an user', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      // function under test
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_1');
      mongoStore.closeConnection();
      assert.deepEqual(JSON.stringify({
        verificationStatus: true,
        deletionStatus: false,
        id: "test_id_1",
        firstName: "test_first_name_1",
        lastName: "test_last_name_1",
        address: "test_address_1",
        email: "test_email_1",
        country: "test_country_1",
        locationId: "test_location_id_1",
        mobileNum: "test_mobile_num_1",
        timeCreated: "test_time_created_1"
      }), userString);
    });

    it('should insert an user', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      // function under test
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_2');
      mongoStore.closeConnection();
      assert.deepEqual(JSON.stringify({
        verificationStatus: true,
        deletionStatus: false,
        id: "test_id_2",
        firstName: "test_first_name_2",
        lastName: "test_last_name_2",
        address: "test_address_2",
        email: "test_email_2",
        country: "test_country_2",
        locationId: "test_location_id_2",
        mobileNum: "test_mobile_num_2",
        timeCreated: "test_time_created_2"
      }), userString);
    });
  });

  describe('updateEntity() tests', () => {
    it('should update all of user\'s fields', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserFactory.getEntity(TEST_UPDATED_USER_PARAMS_1);
      // function under test
      await mockRepository.updateEntity('test_id_1', updatedMockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_1');
      mongoStore.closeConnection();
      assert.deepEqual(JSON.stringify({
        verificationStatus: false,
        deletionStatus: true,
        id: "test_id_1",
        firstName: "updated_test_first_name_1",
        lastName: "updated_test_last_name_1",
        address: "updated_test_address_1",
        email: "updated_test_email_1",
        country: "updated_test_country_1",
        locationId: "updated_test_location_id_1",
        mobileNum: "updated_test_mobile_num_1",
        timeCreated: "updated_test_time_created_1"
      }), userString);
    });

    it('should update all of user\'s fields', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserFactory.getEntity(TEST_UPDATED_USER_PARAMS_2);
      // function under test
      await mockRepository.updateEntity('test_id_2', updatedMockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_2');
      mongoStore.closeConnection();
      assert.deepEqual(JSON.stringify({
        verificationStatus: false,
        deletionStatus: true,
        id: "test_id_2",
        firstName: "updated_test_first_name_2",
        lastName: "updated_test_last_name_2",
        address: "updated_test_address_2",
        email: "updated_test_email_2",
        country: "updated_test_country_2",
        locationId: "updated_test_location_id_2",
        mobileNum: "updated_test_mobile_num_2",
        timeCreated: "updated_test_time_created_2"
      }), userString);
    });

    it('should update user\'s first name field', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserFactory.getEntity(TEST_FIRST_NAME_UPDATED_USER_PARAMS_2);
      // function under test
      await mockRepository.updateEntity('test_id_2', updatedMockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_2');
      mongoStore.closeConnection();
      assert.deepEqual(JSON.stringify({
        verificationStatus: true,
        deletionStatus: false,
        id: "test_id_2",
        firstName: "updated_test_first_name_2",
        lastName: "test_last_name_2",
        address: "test_address_2",
        email: "test_email_2",
        country: "test_country_2",
        locationId: "test_location_id_2",
        mobileNum: "test_mobile_num_2",
        timeCreated: "test_time_created_2"
      }), userString);
    });

    it('should update user\'s email field', async () => {
      // setup
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserFactory.getEntity(TEST_EMAIL_UPDATED_USER_PARAMS_2);
      // function under test
      await mockRepository.updateEntity('test_id_2', updatedMockUser);
      await mongoStore.createConnection();
      const userString = await mongoStore.selectEntity('test_id_2');
      assert.deepEqual(JSON.stringify({
        verificationStatus: true,
        deletionStatus: false,
        id: "test_id_2",
        firstName: "test_first_name_2",
        lastName: "test_last_name_2",
        address: "test_address_2",
        email: "updated_test_email_2",
        country: "test_country_2",
        locationId: "test_location_id_2",
        mobileNum: "test_mobile_num_2",
        timeCreated: "test_time_created_2"
      }), userString);
      mongoStore.closeConnection();
    });
  });

  describe('doesEntityExistById() tests', () => {
    it('should assert that mock user exists collection', async () => {
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id_1');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock user exists collection', async () => {
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id_2');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock user does not exist in collection', async () => {
      const doesMockUserExist = await mockRepository.doesEntityExistById('non_existent_id');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById(' test_id_1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id_1 ');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      const mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      // insert 2 users into repository
      let mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      // insert 2 users into repository
      let mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id_3');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      // insert 2 users into repository
      let mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id_0');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist in collection', async () => {
      // insert 2 users into repository
      let mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository.doesEntityExistById('test_id');
      assert.equal(doesMockUserExist, false);
    });
  });

  describe('getEntityCount() tests', () => {
    it('should assert an user count of 0', async () => {
      const userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 0);
    });

    it('should assert an user count of 1', async () => {
      await insertMockUsers(1);
      const userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 1);
    });

    it('should assert an user count of 2', async () => {
      await insertMockUsers(2);
      const userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 2);
    });

    it('should assert an user count of 36', async () => {
      await insertMockUsers(36);
      const userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 36);
    });
  });

  describe('clearEntities() tests', () => {
    it('should clear all 1 user', async () => {
      // setup
      await insertMockUsers(1);
      let userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 1);
      // function under test
      await mockRepository.clearEntities();
      userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 0);
    });

    it('should clear all 12 users', async () => {
      // setup
      await insertMockUsers(12);
      let userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 12);
      // function under test
      await mockRepository.clearEntities();
      userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 0);
    });

    it('should clear all 65 users', async () => {
      // setup
      await insertMockUsers(65);
      let userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 65);
      // function under test
      await mockRepository.clearEntities();
      userCount = await mockRepository.getEntityCount();
      assert.equal(userCount, 0);
    });
  });


});

async function insertMockUsers(userCount: number) {
  let asyncInsertOperations = [];

  for(let i = 0; i < userCount; ++i) {
    let mockUser = mockUserFactory.getEntity(TEST_USER_PARAMS_1);
    asyncInsertOperations.push(
      mockRepository.insertNewEntity(mockUser.getId(), mockUser)
    );
  }

  // wait for all repository insert promise operations to resolve
  return await Promise.all(asyncInsertOperations)
}
