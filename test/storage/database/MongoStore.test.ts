import 'mocha';
import { strict as assert } from 'assert';

import { MongoStore } from '../../../src/storage/database/MongoStore';
import { User } from '../../../src/domain/entities/users/User';
import { Courier } from '../../../src/domain/entities/users/Courier';
import { Consumer } from '../../../src/domain/entities/users/Consumer';

/**
 * test objects for assertions,
 * should not be used as direct test arguments
 */
const TEST_USER_1: object = {
  id: 'test_user_id_1',
  name: 'robert',
  age: 34,
  timeCreated: '2020-12-14'
};

const TEST_USER_1_UPDATED: object = {
  id: 'test_user_id_1',
  firstName: 'a first name user',
  lastName: 'a last name user',
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

const TEST_USER_2: object = {
  id: 'test_user_id_2',
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

const TEST_USER_2_UPDATED_ID: object = {
  id: 'test_user_id_2',
  firstName: 'a first name user',
  lastName: 'a last name user',
  address: '123 address road',
  email: 'email@email.com'
}

const TEST_USER_2_SMALL_FIELDS: object = {
  id: 'test_user_id_2'
}

const TEST_USER_NULL_FIELDS: object = {
  id: 'test_user_null_fields_id',
  email: null,
  locationId: null
};

// undefined fields are converted to null in mongodb
const TEST_USER_UNDEFINED_FIELDS: object = {
  id: 'test_user_undefined_fields_id',
  email: null,
  locationId: null
};

const TEST_USER_EMPTY_STRING_FIELDS: object = {
  id: '',
  email: '',
  locationId: '',
  country: ''
};

const TEST_DB: string = 'Test_Database';
const TEST_COLLECTION: string = 'Test Collection';
let mongoStore: MongoStore<object>;
let user: User;

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
    it('should insert a generic user object with few fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_user_id_1',
        name: 'robert',
        age: 34,
        timeCreated: '2020-12-14'
      });
      // function under test
      const selectedEntityString = await mongoStore.selectEntity('test_user_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_1
      );
    });

    it('should insert a generic user object with many fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_user_id_2',
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
      const selectedEntityString = await mongoStore.selectEntity('test_user_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_2
      );
    });

    it('should insert a generic user object with empty string fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: '',
        email: '',
        locationId: '',
        country: ''
      });
      // function under test
      const selectedEntityString = await mongoStore.selectEntity('');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_EMPTY_STRING_FIELDS
      );
    });

    it('should insert a generic user object with null fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_user_null_fields_id',
        email: null,
        locationId: null
      });
      // function under test
      const selectedEntityString = await mongoStore.selectEntity('test_user_null_fields_id');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_NULL_FIELDS
      );
    });

    it('should insert a generic user object with undefined fields', async () => {
      // function under test
      await mongoStore.insertNewEntity({
        id: 'test_user_undefined_fields_id',
        email: undefined,
        locationId: undefined
      });
      // function under test
      const selectedEntityString = await mongoStore.selectEntity('test_user_undefined_fields_id');
      // undefined fields are converted to null in mongodb
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_UNDEFINED_FIELDS
      );
    });
  });

  describe('updateEntity() tests', () => {
    it('should update an existing user in collection with same id', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_user_id_1',
        name: 'robert',
        age: 34,
        timeCreated: '2020-12-14'
      });
      let selectedEntityString = await mongoStore.selectEntity('test_user_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_1
      );
      // function under test
      await mongoStore.updateEntity('test_user_id_1', {
        id: 'test_user_id_1',
        firstName: 'a first name user',
        lastName: 'a last name user',
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

      selectedEntityString = await mongoStore.selectEntity('test_user_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_1_UPDATED
      );
    });

    it('should update an existing user in collection, giving a new id', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_user_id_1',
        firstName: 'a first name user',
        lastName: 'a last name user',
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
      let selectedEntityString = await mongoStore.selectEntity('test_user_id_1');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_1_UPDATED
      );
      // function under test
      await mongoStore.updateEntity('test_user_id_1', {
        id: 'test_user_id_2',
        firstName: 'a first name user',
        lastName: 'a last name user',
        address: '123 address road',
        email: 'email@email.com'
      });

      const doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_1' });
      assert.equal(doesUserExist, false);
      selectedEntityString = await mongoStore.selectEntity('test_user_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_2_UPDATED_ID
      );
    });

    it('should update an existing user in collection, with less fields', async () => {
      // test setup
      await mongoStore.insertNewEntity({
        id: 'test_user_id_2',
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
      let selectedEntityString = await mongoStore.selectEntity('test_user_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_2
      );
      // function under test
      await mongoStore.updateEntity('test_user_id_2', {
        id: 'test_user_id_2'
      });

      const doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_1' });
      assert.equal(doesUserExist, false);
      selectedEntityString = await mongoStore.selectEntity('test_user_id_2');
      assert.deepEqual(
        JSON.parse(selectedEntityString),
        TEST_USER_2_SMALL_FIELDS
      );
    });
  });

  describe('doesEntityExistByField() tests', () => {
    it('should assert that user exists collection', async () => {
      let doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_100' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_100', 'email@email.com');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_100' });
      assert.equal(doesUserExist, true);
    });

    it('should assert that user exists collection', async () => {
      let doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_99' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_99', 'email@email.com');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_99' });
      assert.equal(doesUserExist, true);
    });

    it('should assert that user does not exist collection', async () => {
      let doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_1000' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_1000', 'email@email.com');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'id': 'test_user_id_1001' });
      assert.equal(doesUserExist, false);
    });

    it('should assert that user exists collection', async () => {
      let doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'email@aol.com' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_109', 'email@aol.com');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'email@aol.com' });
      assert.equal(doesUserExist, true);
    });

    it('should assert that user exists collection', async () => {
      let doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'anotheremail123@gmail.com' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_109', 'anotheremail123@gmail.com');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'anotheremail122@gmail.com' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': ' anotheremail123@gmail.com' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'anotheremail123@gmail.com' });
      assert.equal(doesUserExist, true);
    });

    it('should assert that user exists collection', async () => {
      let doesUserExist: boolean = await mongoStore.doesEntityExistByField({ 'email': ' ' });
      assert.equal(doesUserExist, false);
      await insertUsers(1, 'test_user_id_99', ' ');
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': '' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': '  ' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': ' ' });
      assert.equal(doesUserExist, true);
    });

    it('should assert that user does not exist collection', async () => {
      await insertUsers(3, 'test_user_id_100', 'test_user_email_100@yahoo.com');
      let doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'test_user_ email_100@yahoo.com' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'test_user_email_100@yahoo.com ' });
      assert.equal(doesUserExist, false);
    });

    it('should assert that user does not exist collection', async () => {
      await insertUsers(1, 'user_id', undefined);
      let doesUserExist = await mongoStore.doesEntityExistByField({ 'email': 'undefined' });
      assert.equal(doesUserExist, false);
      doesUserExist = await mongoStore.doesEntityExistByField({ 'email': '' });
      assert.equal(doesUserExist, false);
    });
  });

  describe('getEntityCount() tests', () => {
    it('should get user count of 0', async () => {
      const userCount: number = await mongoStore.getEntityCount();
      assert.equal(userCount, 0);
    });

    it('should get user count of 1', async () => {
      await insertUsers(1, 'user_id', 'email@email.com');
      const userCount: number = await mongoStore.getEntityCount();
      assert.equal(userCount, 1);
    });

    it('should get user count of 3', async () => {
      await insertUsers(3, 'user_id', 'email@email.com');
      const userCount: number = await mongoStore.getEntityCount();
      assert.equal(userCount, 3);
    });

    it('should get user count of 9', async () => {
      await insertUsers(9, 'user_id', 'email@email.com');
      const userCount: number = await mongoStore.getEntityCount();
      assert.equal(userCount, 9);
    });
  });

});

async function insertUsers(userCount: number, userId: string, email: any) {
  for (let i = 0; i < userCount; ++i) {
    await mongoStore.insertNewEntity({
      id: userId,
      name: 'jack',
      age: 34,
      email: email,
      timeCreated: '2020-12-14',
      field: undefined
    });
  }
}
