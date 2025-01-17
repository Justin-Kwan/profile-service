import 'mocha';
import { strict as assert } from 'assert';

import { MockUser } from '../../domain/entities/users/MockUser';
import { MongoStore } from '../../../src/storage/database/MongoStore';
import { RedisStore } from '../../../src/storage/cache/RedisStore';
import { MockUserRepository } from './MockUserRepository';
import { MockUserSerializer } from '../../domain/user-serializers/MockUserSerializer';

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
  "verificationStatus": true
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
  "verificationStatus": true
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
  "verificationStatus": false
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
  "verificationStatus": false
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
  "verificationStatus": true
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
  "verificationStatus": true
}`;

const mockUserRepository = new MockUserRepository();
const mockUserSerializer = new MockUserSerializer();

const TEST_DB = 'Test_Database';
const TEST_COLLECTION = 'Test Collection';
const TEST_CACHE_SET = 5;

const mongoStore = new MongoStore<MockUser>(TEST_DB, TEST_COLLECTION);
const redisStore = new RedisStore<MockUser>(TEST_CACHE_SET);

async function createDbCacheConnection(): Promise<void> {
  await Promise.all([
    mongoStore.createConnection(),
    redisStore.createConnection()
  ]);
}

function closeDbCacheConnection(): void {
  mongoStore.createConnection();
  redisStore.createConnection();
}

async function insertMockUsers(mockUserCount: number): Promise<any> {
  let asyncInsertOperations = [];

  for (let i = 0; i < mockUserCount; ++i) {
    let mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
    asyncInsertOperations.push(mockUserRepository.insert(mockUser));
  }
  // wait for all repository insert promise operations to resolve
  return await Promise.all(asyncInsertOperations);
}

/**
 * unit testing abstract Repository class via mock repository object
 */
describe('UserRepository tests', () => {

  before(async () => {
    await mockUserRepository.initDatastoreObjects();
  });

  beforeEach(async () => {
    // local datastore object initialization for assertions
    await createDbCacheConnection();
  });

  afterEach(async () => {
    await mockUserRepository.clear();
    // closing local datastore connections
    closeDbCacheConnection();
  });

  after(async () => {
    await mockUserRepository.dropCollection();
  });

  describe('insert() tests', () => {
    it('should insert an user', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      // function under test
      await mockUserRepository.insert(mockUser);
      const dbUserString = await mongoStore.select('test_id_1');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_1",
          firstName: "test_first_name_1",
          lastName: "test_last_name_1",
          email: "test_email_1",
          country: "test_country_1",
          locationId: "test_location_id_1",
          mobileNum: "test_mobile_num_1",
          timeCreated: "test_time_created_1"
        },
        JSON.parse(dbUserString)
      );
      const cacheUserString = await redisStore.select('test_id_1');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_1",
          firstName: "test_first_name_1",
          lastName: "test_last_name_1",
          email: "test_email_1",
          country: "test_country_1",
          locationId: "test_location_id_1",
          mobileNum: "test_mobile_num_1",
          timeCreated: "test_time_created_1"
        },
        JSON.parse(cacheUserString)
      );
    });

    it('should insert an user', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      // function under test
      await mockUserRepository.insert(mockUser);
      await mongoStore.createConnection();
      const dbUserString = await mongoStore.select('test_id_2');
      mongoStore.closeConnection();
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_2",
          firstName: "test_first_name_2",
          lastName: "test_last_name_2",
          email: "test_email_2",
          country: "test_country_2",
          locationId: "test_location_id_2",
          mobileNum: "test_mobile_num_2",
          timeCreated: "test_time_created_2"
        },
        JSON.parse(dbUserString));
    });
  });

  describe('update() tests', () => {
    it('should update all of user\'s fields', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const updatedMockUser = mockUserSerializer
        .deserialize(TEST_UPDATED_USER_PARAMS_1);
      // function under test
      await mockUserRepository.update(updatedMockUser);
      const dbUserString = await mongoStore.select('test_id_1');
      assert.deepEqual(
        {
          verificationStatus: false,
          id: "test_id_1",
          firstName: "updated_test_first_name_1",
          lastName: "updated_test_last_name_1",
          email: "updated_test_email_1",
          country: "updated_test_country_1",
          locationId: "updated_test_location_id_1",
          mobileNum: "updated_test_mobile_num_1",
          timeCreated: "updated_test_time_created_1"
        },
        JSON.parse(dbUserString)
      );
      const cacheUserString = await redisStore.select('test_id_1');
      assert.deepEqual(
        {
          verificationStatus: false,
          id: "test_id_1",
          firstName: "updated_test_first_name_1",
          lastName: "updated_test_last_name_1",
          email: "updated_test_email_1",
          country: "updated_test_country_1",
          locationId: "updated_test_location_id_1",
          mobileNum: "updated_test_mobile_num_1",
          timeCreated: "updated_test_time_created_1"
        },
        JSON.parse(cacheUserString)
      );
    });

    it('should update all of user\'s fields', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const updatedMockUser = mockUserSerializer
        .deserialize(TEST_UPDATED_USER_PARAMS_2);
      // function under test
      await mockUserRepository.update(updatedMockUser);
      const dbUserString = await mongoStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: false,
          id: "test_id_2",
          firstName: "updated_test_first_name_2",
          lastName: "updated_test_last_name_2",
          email: "updated_test_email_2",
          country: "updated_test_country_2",
          locationId: "updated_test_location_id_2",
          mobileNum: "updated_test_mobile_num_2",
          timeCreated: "updated_test_time_created_2"
        },
        JSON.parse(dbUserString)
      );
      const cacheUserString = await redisStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: false,
          id: "test_id_2",
          firstName: "updated_test_first_name_2",
          lastName: "updated_test_last_name_2",
          email: "updated_test_email_2",
          country: "updated_test_country_2",
          locationId: "updated_test_location_id_2",
          mobileNum: "updated_test_mobile_num_2",
          timeCreated: "updated_test_time_created_2"
        },
        JSON.parse(cacheUserString)
      );
    });

    it('should update user\'s first name field', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const updatedMockUser = mockUserSerializer
        .deserialize(TEST_FIRST_NAME_UPDATED_USER_PARAMS_2);
      // function under test
      await mockUserRepository.update(updatedMockUser);
      const dbUserString = await mongoStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_2",
          firstName: "updated_test_first_name_2",
          lastName: "test_last_name_2",
          email: "test_email_2",
          country: "test_country_2",
          locationId: "test_location_id_2",
          mobileNum: "test_mobile_num_2",
          timeCreated: "test_time_created_2"
        },
        JSON.parse(dbUserString)
      );
      const cacheUserString: string = await redisStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_2",
          firstName: "updated_test_first_name_2",
          lastName: "test_last_name_2",
          email: "test_email_2",
          country: "test_country_2",
          locationId: "test_location_id_2",
          mobileNum: "test_mobile_num_2",
          timeCreated: "test_time_created_2"
        },
        JSON.parse(cacheUserString)
      );
    });

    it('should update user\'s email field', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const updatedMockUser = mockUserSerializer
        .deserialize(TEST_EMAIL_UPDATED_USER_PARAMS_2);
      // function under test
      await mockUserRepository.update(updatedMockUser);
      const dbUserString = await mongoStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_2",
          firstName: "test_first_name_2",
          lastName: "test_last_name_2",
          email: "updated_test_email_2",
          country: "test_country_2",
          locationId: "test_location_id_2",
          mobileNum: "test_mobile_num_2",
          timeCreated: "test_time_created_2"
        },
        JSON.parse(dbUserString)
      );
      const cacheUserString = await redisStore.select('test_id_2');
      assert.deepEqual(
        {
          verificationStatus: true,
          id: "test_id_2",
          firstName: "test_first_name_2",
          lastName: "test_last_name_2",
          email: "updated_test_email_2",
          country: "test_country_2",
          locationId: "test_location_id_2",
          mobileNum: "test_mobile_num_2",
          timeCreated: "test_time_created_2"
        },
        JSON.parse(cacheUserString)
      );
    });
  });

  describe('delete() tests', () => {
    it('should delete a single user', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      // function under test
      await mockUserRepository.delete(mockUser.getId());
      const isUserInDb = await mongoStore
        .existByField({ 'id': mockUser.getId() });
      const isUserInCache = await redisStore
        .existById(mockUser.getId());
      assert.equal(isUserInDb, false);
      assert.equal(isUserInCache, false);
    });

    it('should delete a single user', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      // function under test
      await mockUserRepository.delete(mockUser.getId());
      const isUserInDb = await mongoStore
        .existByField({ id: mockUser.getId() });
      const isUserInCache = await redisStore
        .existById(mockUser.getId());
      assert.equal(isUserInDb, false);
      assert.equal(isUserInCache, false);
    });

    it('should delete a single user', async () => {
      // setup
      const mockUser = mockUserSerializer.deserialize(TEST_FIRST_NAME_UPDATED_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      // function under test
      await mockUserRepository.delete(mockUser.getId());
      const isUserInDb = await mongoStore
        .existByField({ id: mockUser.getId() });
      const isUserInCache = await redisStore
        .existById(mockUser.getId());
      assert.equal(isUserInDb, false);
      assert.equal(isUserInCache, false);
    });
  });

  describe('existById() tests', () => {
    it('should assert that mock user exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id_1');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock user exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id_2');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock user does not exist', async () => {
      const doesMockUserExist = await mockUserRepository
        .existById('non_existent_id');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById(' test_id_1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id_1 ');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      // insert 2 users into repository
      let mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      // insert 2 users into repository
      let mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id_3');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      // insert 2 users into repository
      let mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id_0');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock user does not exist', async () => {
      // insert 2 users into repository
      let mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesMockUserExist = await mockUserRepository
        .existById('test_id');
      assert.equal(doesMockUserExist, false);
    });
  });

  describe('existByEmail() tests', () => {
    it('should assert that mock user with same email exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      const doesUserExist = await mockUserRepository
        .existByEmail('test_email_1');
      assert.equal(doesUserExist, true);
    });

    it('should assert that mock user with same email exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      const doesUserExist = await mockUserRepository
        .existByEmail('test_email_2');
      assert.equal(doesUserExist, true);
    });

    it('should assert that mock user with same email does not exist', async () => {
      let doesUserExist: boolean = await mockUserRepository
        .existByEmail('non_existent_user_email');
      assert.equal(doesUserExist, false);
    });

    it('should assert that mock user with same email does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByEmail(' test_email_1');
      assert.equal(doesUserExist, false);
    });

    it('should assert that mock user with same email does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByEmail('test_email_1 ');
      assert.equal(doesUserExist, false);
    });

    it('should assert that mock user with same email does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByEmail('test_ email_1');
      assert.equal(doesUserExist, false);
    });
  });

  describe('existByMobileNum() tests', () => {
    it('should assert that mock user with same mobile number exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByMobileNum('test_mobile_num_1');
      assert.equal(doesUserExist, true);
    });

    it('should assert that mock user with same mobile number exists', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByMobileNum('test_mobile_num_2');
      assert.equal(doesUserExist, true);
    });

    it('should assert that mock user with same mobile number does not exist', async () => {
      let doesUserExist: boolean = await mockUserRepository
        .existByMobileNum('non_existent_user_mobile_num');
      assert.equal(doesUserExist, false);
    });

    it('should assert that mock user with same mobile number does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_1);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByMobileNum('test_mobile_num_2');
      assert.equal(doesUserExist, false);
    });

    it('should assert that mock user with same mobile number does not exist', async () => {
      const mockUser = mockUserSerializer.deserialize(TEST_USER_PARAMS_2);
      await mockUserRepository.insert(mockUser);
      let doesUserExist: boolean = await mockUserRepository
        .existByMobileNum('test_mobile_num_1');
      assert.equal(doesUserExist, false);
    });
  });

  describe('getCount() tests', () => {
    it('should assert an mock user count of 0', async () => {
      const mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 0);
    });

    it('should assert an mock user count of 1', async () => {
      await insertMockUsers(1);
      const mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 1);
    });

    it('should assert an mock user count of 2', async () => {
      await insertMockUsers(2);
      const mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 2);
    });

    it('should assert an mock user count of 36', async () => {
      await insertMockUsers(36);
      const mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 36);
    });
  });

  describe('clear() tests', () => {
    it('should clear all 1 mock user', async () => {
      // setup
      await insertMockUsers(1);
      let mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 1);
      // function under test
      await mockUserRepository.clear();
      mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 0);
    });

    it('should clear all 12 mock users', async () => {
      // setup
      await insertMockUsers(12);
      let mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 12);
      // function under test
      await mockUserRepository.clear();
      mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 0);
    });

    it('should clear all 65 mock users', async () => {
      // setup
      await insertMockUsers(65);
      let mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 65);
      // function under test
      await mockUserRepository.clear();
      mockUserCount = await mockUserRepository.getCount();
      assert.equal(mockUserCount, 0);
    });
  });

});
