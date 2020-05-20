"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const RedisStore_1 = require("../../../src/storage/cache/RedisStore");
/**
 * test objects for assertions
 */
const TEST_ENTITY_1 = {
    id: 'test_entity_id_1',
    name: 'robert',
    age: 34,
    timeCreated: '2020-12-14'
};
const TEST_ENTITY_1_UPDATED = {
    id: 'test_entity_id_1',
    firstName: 'an updated first name entity',
    lastName: 'an updated last name entity',
    address: 'updated 123 address road',
    email: 'updated email@email.com',
    country: 'updated Country',
    city: 'updated City',
    zipCode: 'updated zip code',
    locationId: 'updated ChIJ1dIqa2OAhYAREimtEtfBLyc',
    mobileNum: 'updated 333-333-3333',
    timeCreated: 'updated 12-23-2012',
    verificationStatus: false,
    deletionStatus: true
};
const TEST_ENTITY_2 = {
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
const TEST_ENTITY_2_SMALL_FIELDS = {
    id: 'test_entity_id_2'
};
const TEST_ENTITY_NULL_FIELDS = {
    id: 'test_entity_null_fields_id',
    email: null,
    locationId: null
};
// undefined fields are converted to null in redisdb
const TEST_ENTITY_UNDEFINED_FIELDS = {
    id: 'test_entity_undefined_fields_id',
    email: undefined,
    locationId: undefined
};
const TEST_ENTITY_EMPTY_STRING_FIELDS = {
    id: '',
    email: '',
    locationId: '',
    country: ''
};
const TEST_CACHE_SET = 5;
let redisStore = new RedisStore_1.RedisStore(TEST_CACHE_SET);
describe('RedisStore Tests', () => {
    before(async () => {
        await redisStore.createConnection();
    });
    afterEach(async () => {
        await redisStore.clear();
    });
    after(async () => {
        redisStore.closeConnection();
    });
    describe('insert() tests', () => {
        it('should insert a generic entity object with few fields', async () => {
            // function under test
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_1);
            // function under test
            const selectedEntityString = await redisStore.select(TEST_ENTITY_1.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1);
        });
        it('should insert a generic entity object with many fields', async () => {
            // function under test
            await redisStore.insert(TEST_ENTITY_2.id, TEST_ENTITY_2);
            // function under test
            const selectedEntityString = await redisStore.select(TEST_ENTITY_2.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2);
        });
        it('should insert a generic entity object with empty string fields', async () => {
            // function under test
            await redisStore.insert(TEST_ENTITY_EMPTY_STRING_FIELDS.id, TEST_ENTITY_EMPTY_STRING_FIELDS);
            // function under test
            const selectedEntityString = await redisStore.select(TEST_ENTITY_2.id);
            // redis does not store anything with all empty fields
            assert_1.strict.deepEqual(selectedEntityString, null);
        });
        it('should insert a generic entity object with null fields', async () => {
            // function under test
            await redisStore.insert(TEST_ENTITY_NULL_FIELDS.id, TEST_ENTITY_NULL_FIELDS);
            // function under test
            const selectedEntityString = await redisStore.select(TEST_ENTITY_NULL_FIELDS.id);
            // redis maintains null fields
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_NULL_FIELDS);
        });
        it('should insert a generic entity object with undefined fields', async () => {
            // function under test
            await redisStore.insert(TEST_ENTITY_UNDEFINED_FIELDS.id, TEST_ENTITY_UNDEFINED_FIELDS);
            // function under test
            const selectedEntityString = await redisStore.select(TEST_ENTITY_UNDEFINED_FIELDS.id);
            // redis truncates undefined fields
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), { id: TEST_ENTITY_UNDEFINED_FIELDS.id });
        });
    });
    describe('update() tests', () => {
        it('should update an existing entity in collection with same id', async () => {
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_1);
            // function under test
            await redisStore.update(TEST_ENTITY_1.id, TEST_ENTITY_1_UPDATED);
            const selectedEntityString = await redisStore.select(TEST_ENTITY_1.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1_UPDATED);
        });
        it('should update an existing entity in collection, giving a new id, but keeping same key', async () => {
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_1);
            // function under test
            await redisStore.update(TEST_ENTITY_1.id, TEST_ENTITY_2);
            const selectedEntityString = await redisStore.select(TEST_ENTITY_1.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2);
        });
        it('should update an existing entity in collection, with less fields', async () => {
            await redisStore.insert(TEST_ENTITY_2.id, TEST_ENTITY_2);
            // function under test
            await redisStore.update(TEST_ENTITY_2.id, TEST_ENTITY_2_SMALL_FIELDS);
            const selectedEntityString = await redisStore.select(TEST_ENTITY_2.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2_SMALL_FIELDS);
        });
    });
    describe('existById() tests', () => {
        it('should assert that entity does not exist', async () => {
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_1.id);
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity does not exist', async () => {
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_2.id);
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity does not exist', async () => {
            // setup
            // inserting wrong id key for entity
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_2);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_2.id);
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity does not exist', async () => {
            // setup
            // inserting wrong id key for entity
            await redisStore.insert(TEST_ENTITY_2.id, TEST_ENTITY_1);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_1.id);
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity exists', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_1);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_1.id);
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_2.id, TEST_ENTITY_2);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_2.id);
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_1_UPDATED.id, TEST_ENTITY_1_UPDATED);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_1_UPDATED.id);
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_NULL_FIELDS.id, TEST_ENTITY_NULL_FIELDS);
            // function under test
            const doesEntityExist = await redisStore.existById(TEST_ENTITY_NULL_FIELDS.id);
            assert_1.strict.equal(doesEntityExist, true);
        });
    });
    describe('delete() tests', () => {
        it('should delete an entity', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_1.id, TEST_ENTITY_1);
            let selectedEntityString = await redisStore.select(TEST_ENTITY_1.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1);
            // function under test
            await redisStore.delete(TEST_ENTITY_1.id);
            selectedEntityString = await redisStore.select(TEST_ENTITY_1.id);
            assert_1.strict.equal(selectedEntityString, null);
        });
        it('should delete an entity', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_2.id, TEST_ENTITY_2);
            let selectedEntityString = await redisStore.select(TEST_ENTITY_2.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2);
            // function under test
            await redisStore.delete(TEST_ENTITY_2.id);
            selectedEntityString = await redisStore.select(TEST_ENTITY_2.id);
            assert_1.strict.equal(selectedEntityString, null);
        });
        it('should delete an entity', async () => {
            // setup
            await redisStore.insert(TEST_ENTITY_1_UPDATED.id, TEST_ENTITY_1_UPDATED);
            let selectedEntityString = await redisStore.select(TEST_ENTITY_1_UPDATED.id);
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1_UPDATED);
            // function under test
            await redisStore.delete(TEST_ENTITY_1_UPDATED.id);
            selectedEntityString = await redisStore.select(TEST_ENTITY_1_UPDATED.id);
            assert_1.strict.equal(selectedEntityString, null);
        });
    });
});
