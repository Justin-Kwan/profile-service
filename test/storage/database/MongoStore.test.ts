import 'mocha';
import { strict as assert } from 'assert';

import { MongoStore } from '../../../src/storage/database/MongoStore';

/**
 * test objects for assertions,
 * should not be used as direct test arguments
 */
const TEST_ENTITY_1: object = {
  id: 'test_entity_id_1',
  name: 'robert',
  age: 34,
  timeCreated: '2020-12-14'
};

const TEST_ENTITY_1_UPDATED: object = {
  id: 'test_entity_id_1',
  firstName: 'a first name entity',
  lastName: 'a last name entity',
  address: '123 address road',
  email: 'email@email.com',
  country: 'Country',
  city: 'City',
  zipCode: 'zip code',
  locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
  mobileNum: '333-333-3333',
  timeCreated: '12-23-2012',
  verificationStatus: true,
  deletionStatus: false
};

const TEST_ENTITY_2: object = {
  id: 'test_entity_id_2',
  firstName: 'a first name',
  lastName: 'a last name',
  address: '123 address road',
  email: 'email@email.com',
  country: 'Country',
  city: 'City',
  zipCode: 'zip code',
  locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
  mobileNum: '333-333-3333',
  timeCreated: '12-23-2012',
  verificationStatus: true,
  deletionStatus: false
};

const TEST_ENTITY_2_UPDATED_ID: object = {
  id: 'test_entity_id_2',
  firstName: 'a first name entity',
  lastName: 'a last name entity',
  address: '123 address road',
  email: 'email@email.com'
}

const TEST_ENTITY_2_SMALL_FIELDS: object = {
  id: 'test_entity_id_2'
}

const TEST_ENTITY_NULL_FIELDS: object = {
  id: 'test_entity_null_fields_id',
  email: null,
  locationId: null
};

// undefined fields are converted to null in mongodb
const TEST_ENTITY_UNDEFINED_FIELDS: object = {
  id: 'test_entity_undefined_fields_id',
  email: null,
  locationId: null
};

const TEST_ENTITY_EMPTY_STRING_FIELDS: object = {
  id: '',
  email: '',
  locationId: '',
  country: ''
};

const TEST_DB: string = 'Test_Database';
const TEST_COLLECTION: string = 'Test Collection';

let mongoStore: MongoStore<object>;

async function insertUsers(entityCount: number, entityId: string, email: any) {
  for (let i = 0; i < entityCount; ++i) {
    await mongoStore.insertNewEntity({
      id: entityId,
      name: 'jack',
      age: 34,
      email: email,
      timeCreated: '2020-12-14',
      field: undefined
    });
  }
}

describe('MongoStore Tests', () => {

  before(async () => {
    mongoStore = new MongoStore<object>(TEST_DB, TEST_COLLECTION);
    await mongoStore.createConnection();
  });

  afterEach(async () => {
    await mongoStore.clearEntities();
  });

  after(async () => {
    await mongoStore.dropEntityCollection();
    mongoStore.closeConnection();
  });

  describe('insertNewEntity() & selectEntity() tests', () => {
    it('should insert a generic entity object with few fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_1',
        name: 'robert',
        age: 34,
        timeCreated: '2020-12-14'
      });
      // function under test
      const selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_1
      );
    });

    it('should insert a generic entity object with many fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_2',
        firstName: 'a first name',
        lastName: 'a last name',
        address: '123 address road',
        email: 'email@email.com',
        country: 'Country',
        city: 'City',
        zipCode: 'zip code',
        locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
        mobileNum: '333-333-3333',
        timeCreated: '12-23-2012',
        verificationStatus: true,
        deletionStatus: false
      });
      // function under test
      const selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_2
      );
    });

    it('should insert a generic entity object with empty string fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: '',
        email: '',
        locationId: '',
        country: ''
      });
      // function under test
      const selectedEntityString = await mongoStore
        .selectEntity('');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_EMPTY_STRING_FIELDS
      );
    });

    it('should insert a generic entity object with null fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_null_fields_id',
        email: null,
        locationId: null
      });
      // function under test
      const selectedEntityString = await mongoStore
        .selectEntity('test_entity_null_fields_id');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_NULL_FIELDS
      );
    });

    it('should insert a generic entity object with undefined fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_undefined_fields_id',
        email: undefined,
        locationId: undefined
      });
      // function under test
      const selectedEntityString = await mongoStore
        .selectEntity('test_entity_undefined_fields_id');
      // undefined fields are converted to null in mongodb
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_UNDEFINED_FIELDS
      );
    });
  });

  describe('updateEntity() tests', () => {
    it('should update an existing entity in collection with same id', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_1',
        name: 'robert',
        age: 34,
        timeCreated: '2020-12-14'
      });
      let selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_1
      );
      // function under test
      await mongoStore.updateEntity('test_entity_id_1', {
        id: 'test_entity_id_1',
        firstName: 'a first name entity',
        lastName: 'a last name entity',
        address: '123 address road',
        email: 'email@email.com',
        country: 'Country',
        city: 'City',
        zipCode: 'zip code',
        locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
        mobileNum: '333-333-3333',
        timeCreated: '12-23-2012',
        verificationStatus: true,
        deletionStatus: false
      });

      selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_1_UPDATED
      );
    });

    it('should update an existing entity in collection, giving a new id', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_1',
        firstName: 'a first name entity',
        lastName: 'a last name entity',
        address: '123 address road',
        email: 'email@email.com',
        country: 'Country',
        city: 'City',
        zipCode: 'zip code',
        locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
        mobileNum: '333-333-3333',
        timeCreated: '12-23-2012',
        verificationStatus: true,
        deletionStatus: false
      });
      let selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_1_UPDATED
      );
      // function under test
      await mongoStore.updateEntity('test_entity_id_1', {
        id: 'test_entity_id_2',
        firstName: 'a first name entity',
        lastName: 'a last name entity',
        address: '123 address road',
        email: 'email@email.com'
      });

      const doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_1' });
      assert.equal(doesEntityExist, false);
      selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_2_UPDATED_ID
      );
    });

    it('should update an existing entity in collection, with less fields', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_2',
        firstName: 'a first name',
        lastName: 'a last name',
        address: '123 address road',
        email: 'email@email.com',
        country: 'Country',
        city: 'City',
        zipCode: 'zip code',
        locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
        mobileNum: '333-333-3333',
        timeCreated: '12-23-2012',
        verificationStatus: true,
        deletionStatus: false
      });
      let selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_2
      );
      // function under test
      await mongoStore.updateEntity('test_entity_id_2', {
        id: 'test_entity_id_2'
      });

      const doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_1' });
      assert.equal(doesEntityExist, false);
      selectedEntityString = await mongoStore
        .selectEntity('test_entity_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_ENTITY_2_SMALL_FIELDS
      );
    });
  });

  describe('deleteEntity() tests', () => {
    it('should delete an entity with many fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_1',
        name: 'robert',
        age: 34,
        timeCreated: '2020-12-14'
      });
      // function under test
      const selectedEntityString = await mongoStore
        .deleteEntity('test_entity_id_1');
      const doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_1' });
      assert.equal(doesEntityExist, false);
    });

    it('should delete an entity with many fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_entity_id_2',
        firstName: 'a first name',
        lastName: 'a last name',
        address: '123 address road',
        email: 'email@email.com',
        country: 'Country',
        city: 'City',
        zipCode: 'zip code',
        locationId: 'ChIJ1dIqa2OAhYAREimtEtfBLyc',
        mobileNum: '333-333-3333',
        timeCreated: '12-23-2012',
        verificationStatus: true,
        deletionStatus: false
      });
      // function under test
      const selectedEntityString = await mongoStore
        .deleteEntity('test_entity_id_2');
      const doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_2' });
      assert.equal(doesEntityExist, false);
    });

    it('should delete an entity with empty string fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: '',
        email: '',
        locationId: '',
        country: ''
      });
      // function under test
      const selectedEntityString = await mongoStore
        .deleteEntity('');
      const doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': '' });
      assert.equal(doesEntityExist, false);
    });
  });

  describe('doesEntityExistByField() tests', () => {
    it('should assert that entity exists collection', async () => {
      let doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_100' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_100', 'email@email.com');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_100' });
      assert.equal(doesEntityExist, true);
    });

    it('should assert that entity exists collection', async () => {
      let doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_99' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_99', 'email@email.com');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_99' });
      assert.equal(doesEntityExist, true);
    });

    it('should assert that entity does not exist collection', async () => {
      let doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_1000' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_1000', 'email@email.com');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'id': 'test_entity_id_1001' });
      assert.equal(doesEntityExist, false);
    });

    it('should assert that entity exists collection', async () => {
      let doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'email@aol.com' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_109', 'email@aol.com');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'email@aol.com' });
      assert.equal(doesEntityExist, true);
    });

    it('should assert that entity exists collection', async () => {
      let doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'anotheremail123@gmail.com' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_109', 'anotheremail123@gmail.com');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'anotheremail122@gmail.com' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': ' anotheremail123@gmail.com' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'anotheremail123@gmail.com' });
      assert.equal(doesEntityExist, true);
    });

    it('should assert that entity exists collection', async () => {
      let doesEntityExist: boolean = await mongoStore
        .doesEntityExistByField({ 'email': ' ' });
      assert.equal(doesEntityExist, false);
      await insertUsers(1, 'test_entity_id_99', ' ');
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': '' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': '  ' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': ' ' });
      assert.equal(doesEntityExist, true);
    });

    it('should assert that entity does not exist collection', async () => {
      await insertUsers(3, 'test_entity_id_100', 'test_entity_email_100@yahoo.com');
      let doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'test_entity_ email_100@yahoo.com' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'test_entity_email_100@yahoo.com ' });
      assert.equal(doesEntityExist, false);
    });

    it('should assert that entity does not exist collection', async () => {
      await insertUsers(1, 'entity_id', undefined);
      let doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': 'undefined' });
      assert.equal(doesEntityExist, false);
      doesEntityExist = await mongoStore
        .doesEntityExistByField({ 'email': '' });
      assert.equal(doesEntityExist, false);
    });
  });

  describe('getEntityCount() tests', () => {
    it('should get entity count of 0', async () => {
      const entityCount: number = await mongoStore.getEntityCount();
      assert.equal(entityCount, 0);
    });

    it('should get entity count of 1', async () => {
      await insertUsers(1, 'entity_id', 'email@email.com');
      const entityCount: number = await mongoStore.getEntityCount();
      assert.equal(entityCount, 1);
    });

    it('should get entity count of 3', async () => {
      await insertUsers(3, 'entity_id', 'email@email.com');
      const entityCount: number = await mongoStore.getEntityCount();
      assert.equal(entityCount, 3);
    });

    it('should get entity count of 9', async () => {
      await insertUsers(9, 'entity_id', 'email@email.com');
      const entityCount: number = await mongoStore.getEntityCount();
      assert.equal(entityCount, 9);
    });
  });

});
