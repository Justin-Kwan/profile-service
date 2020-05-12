import 'mocha';
import { strict as assert } from 'assert';

import { MockUser } from '../../domain/entities/users/MockUser';
import { MongoStore } from '../../../src/storage/database/MongoStore';
import { RedisStore } from '../../../src/storage/cache/RedisStore';
import { MockRepository } from './MockRepository';
import {
  MockUserSerializer
} from '../../domain/entities/object-serializers/MockUserSerializer';

const TEST_ENTITY_PARAMS_1: string = `{
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

const TEST_ENTITY_PARAMS_2: string = `{
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

const TEST_UPDATED_ENTITY_PARAMS_1: string = `{
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

const TEST_UPDATED_ENTITY_PARAMS_2: string = `{
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

const TEST_EMAIL_UPDATED_ENTITY_PARAMS_2: string = `{
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

const TEST_FIRST_NAME_UPDATED_ENTITY_PARAMS_2: string = `{
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

const mockRepository = new MockRepository();
const mockUserSerializer = new MockUserSerializer();

const TEST_DB = 'Test_Database';
const TEST_COLLECTION = 'Test Collection';

const mongoStore = new MongoStore<MockUser>(TEST_DB, TEST_COLLECTION);
const redisStore = new RedisStore<MockUser>();

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

async function insertMockUsers(entityCount: number): Promise<any> {
  let asyncInsertOperations = [];

  for (let i = 0; i < entityCount; ++i) {
    let mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
    asyncInsertOperations.push(
      mockRepository.insertNewEntity(mockUser.getId(), mockUser)
    );
  }
  // wait for all repository insert promise operations to resolve
  return await Promise.all(asyncInsertOperations);
}

/**
 * unit testing abstract Repository class via mock repository object
 */
describe('Repository tests', () => {

  before(async () => {
    await mockRepository.initDatastoreObjects();
  });

  beforeEach(async () => {
    // local datastore object initialization for assertions
    await createDbCacheConnection();
  });

  afterEach(async () => {
    await mockRepository.clearEntities();
    // closing local datastore connections
    closeDbCacheConnection();
  });

  after(async () => {
    await mockRepository.dropEntityCollection();
  });

  describe('insertNewEntity() tests', () => {
    it('should insert an entity', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      // function under test
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const dbEntityString = await mongoStore.selectEntity('test_id_1');
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
        JSON.parse(dbEntityString)
      );
      const cacheEntityString = await redisStore.selectEntity('test_id_1');
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
        JSON.parse(cacheEntityString)
      );
    });

    it('should insert an entity', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      // function under test
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      await mongoStore.createConnection();
      const entityString = await mongoStore.selectEntity('test_id_2');
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
        JSON.parse(entityString));
    });
  });

  describe('updateEntity() tests', () => {
    it('should update all of entity\'s fields', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserSerializer
        .serialize(TEST_UPDATED_ENTITY_PARAMS_1);
      // function under test
      await mockRepository.updateEntity('test_id_1', updatedMockUser);
      const dbEntityString = await mongoStore.selectEntity('test_id_1');
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
        JSON.parse(dbEntityString)
      );
      const cacheEntityString = await redisStore.selectEntity('test_id_1');
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
        JSON.parse(cacheEntityString)
      );
    });

    it('should update all of entity\'s fields', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserSerializer
        .serialize(TEST_UPDATED_ENTITY_PARAMS_2);
      // function under test
      mockRepository.updateEntity('test_id_2', updatedMockUser);
      const dbEntityString = await mongoStore.selectEntity('test_id_2');
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
        JSON.parse(dbEntityString)
      );
      const cacheEntityString = await redisStore.selectEntity('test_id_2');
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
        JSON.parse(cacheEntityString)
      );
    });

    it('should update entity\'s first name field', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserSerializer
        .serialize(TEST_FIRST_NAME_UPDATED_ENTITY_PARAMS_2);
      // function under test
      mockRepository.updateEntity('test_id_2', updatedMockUser);
      const dbEntityString = await mongoStore.selectEntity('test_id_2');
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
        JSON.parse(dbEntityString)
      );
      const cacheEntityString: string = await redisStore.selectEntity('test_id_2');
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
        JSON.parse(cacheEntityString)
      );
    });

    it('should update entity\'s email field', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const updatedMockUser = mockUserSerializer
        .serialize(TEST_EMAIL_UPDATED_ENTITY_PARAMS_2);
      // function under test
      await mockRepository.updateEntity('test_id_2', updatedMockUser);
      const dbEntityString = await mongoStore.selectEntity('test_id_2');
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
        JSON.parse(dbEntityString)
      );
      const cacheEntityString = await redisStore.selectEntity('test_id_2');
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
        JSON.parse(cacheEntityString)
      );
    });
  });

  describe('deleteEntity() tests', () => {
    it('should delete a single entity', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      // function under test
      mockRepository.deleteEntity(mockUser.getId());
      const isEntityInDb = await mongoStore
        .doesEntityExistByField({ 'id': mockUser.getId() });
      const isEntityInCache = await redisStore
        .doesEntityExistById(mockUser.getId());
      assert.equal(isEntityInDb, false);
      assert.equal(isEntityInCache, false);
    });

    it('should delete a single entity', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      // function under test
      mockRepository.deleteEntity(mockUser.getId());
      const isEntityInDb = await mongoStore
        .doesEntityExistByField({ id: mockUser.getId() });
      const isEntityInCache = await redisStore
        .doesEntityExistById(mockUser.getId());
      assert.equal(isEntityInDb, false);
      assert.equal(isEntityInCache, false);
    });

    it('should delete a single entity', async () => {
      // setup
      const mockUser = mockUserSerializer.serialize(TEST_FIRST_NAME_UPDATED_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      // function under test
      mockRepository.deleteEntity(mockUser.getId());
      const isEntityInDb = await mongoStore
        .doesEntityExistByField({ id: mockUser.getId() });
      const isEntityInCache = await redisStore
        .doesEntityExistById(mockUser.getId());
      assert.equal(isEntityInDb, false);
      assert.equal(isEntityInCache, false);
    });
  });

  describe('doesEntityExistById() tests', () => {
    it('should assert that mock entity exists collection', async () => {
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id_1');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock entity exists collection', async () => {
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id_2');
      assert.equal(doesMockUserExist, true);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('non_existent_id');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById(' test_id_1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id_1 ');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      const mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      // insert 2 entities into repository
      let mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id _1');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      // insert 2 entities into repository
      let mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id_3');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      // insert 2 entities into repository
      let mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id_0');
      assert.equal(doesMockUserExist, false);
    });

    it('should assert that mock entity does not exist in collection', async () => {
      // insert 2 entities into repository
      let mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_1);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      mockUser = mockUserSerializer.serialize(TEST_ENTITY_PARAMS_2);
      await mockRepository.insertNewEntity(mockUser.getId(), mockUser);
      const doesMockUserExist = await mockRepository
        .doesEntityExistById('test_id');
      assert.equal(doesMockUserExist, false);
    });
  });

  describe('getEntityCount() tests', () => {
    it('should assert an entity count of 0', async () => {
      const entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 0);
    });

    it('should assert an entity count of 1', async () => {
      await insertMockUsers(1);
      const entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 1);
    });

    it('should assert an entity count of 2', async () => {
      await insertMockUsers(2);
      const entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 2);
    });

    it('should assert an entity count of 36', async () => {
      await insertMockUsers(36);
      const entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 36);
    });
  });

  describe('clearEntities() tests', () => {
    it('should clear all 1 entity', async () => {
      // setup
      await insertMockUsers(1);
      let entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 1);
      // function under test
      await mockRepository.clearEntities();
      entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 0);
    });

    it('should clear all 12 entities', async () => {
      // setup
      await insertMockUsers(12);
      let entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 12);
      // function under test
      await mockRepository.clearEntities();
      entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 0);
    });

    it('should clear all 65 entities', async () => {
      // setup
      await insertMockUsers(65);
      let entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 65);
      // function under test
      await mockRepository.clearEntities();
      entityCount = await mockRepository.getEntityCount();
      assert.equal(entityCount, 0);
    });
  });

});
