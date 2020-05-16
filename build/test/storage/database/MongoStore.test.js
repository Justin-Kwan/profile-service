"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const MongoStore_1 = require("../../../src/storage/database/MongoStore");
/**
 * test objects for assertions,
 * should not be used as direct test arguments
 */
const TEST_ENTITY_1 = {
    id: 'test_entity_id_1',
    name: 'robert',
    age: 34,
    timeCreated: '2020-12-14'
};
const TEST_ENTITY_1_UPDATED = {
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
const TEST_ENTITY_2_UPDATED_ID = {
    id: 'test_entity_id_2',
    firstName: 'a first name entity',
    lastName: 'a last name entity',
    address: '123 address road',
    email: 'email@email.com'
};
const TEST_ENTITY_2_SMALL_FIELDS = {
    id: 'test_entity_id_2'
};
const TEST_ENTITY_NULL_FIELDS = {
    id: 'test_entity_null_fields_id',
    email: null,
    locationId: null
};
// undefined fields are converted to null in mongodb
const TEST_ENTITY_UNDEFINED_FIELDS = {
    id: 'test_entity_undefined_fields_id',
    email: null,
    locationId: null
};
const TEST_ENTITY_EMPTY_STRING_FIELDS = {
    id: '',
    email: '',
    locationId: '',
    country: ''
};
const TEST_DB = 'Test_Database';
const TEST_COLLECTION = 'Test Collection';
let mongoStore;
async function insertUsers(entityCount, entityId, email) {
    for (let i = 0; i < entityCount; ++i) {
        await mongoStore.insert({
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
        mongoStore = new MongoStore_1.MongoStore(TEST_DB, TEST_COLLECTION);
        await mongoStore.createConnection();
    });
    afterEach(async () => {
        await mongoStore.clear();
    });
    after(async () => {
        await mongoStore.dropCollection();
        mongoStore.closeConnection();
    });
    describe('insert() & select() tests', () => {
        it('should insert a generic entity object with few fields', async () => {
            // function under test
            await mongoStore.insert({
                id: 'test_entity_id_1',
                name: 'robert',
                age: 34,
                timeCreated: '2020-12-14'
            });
            // function under test
            const selectedEntityString = await mongoStore
                .select('test_entity_id_1');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1);
        });
        it('should insert a generic entity object with many fields', async () => {
            // function under test
            await mongoStore.insert({
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
                .select('test_entity_id_2');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2);
        });
        it('should insert a generic entity object with empty string fields', async () => {
            // function under test
            await mongoStore.insert({
                id: '',
                email: '',
                locationId: '',
                country: ''
            });
            // function under test
            const selectedEntityString = await mongoStore
                .select('');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_EMPTY_STRING_FIELDS);
        });
        it('should insert a generic entity object with null fields', async () => {
            // function under test
            await mongoStore.insert({
                id: 'test_entity_null_fields_id',
                email: null,
                locationId: null
            });
            // function under test
            const selectedEntityString = await mongoStore
                .select('test_entity_null_fields_id');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_NULL_FIELDS);
        });
        it('should insert a generic entity object with undefined fields', async () => {
            // function under test
            await mongoStore.insert({
                id: 'test_entity_undefined_fields_id',
                email: undefined,
                locationId: undefined
            });
            // function under test
            const selectedEntityString = await mongoStore
                .select('test_entity_undefined_fields_id');
            // undefined fields are converted to null in mongodb
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_UNDEFINED_FIELDS);
        });
    });
    describe('update() tests', () => {
        it('should update an existing entity in collection with same id', async () => {
            // test setup
            await mongoStore.insert({
                id: 'test_entity_id_1',
                name: 'robert',
                age: 34,
                timeCreated: '2020-12-14'
            });
            let selectedEntityString = await mongoStore
                .select('test_entity_id_1');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1);
            // function under test
            await mongoStore.update('test_entity_id_1', {
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
                .select('test_entity_id_1');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1_UPDATED);
        });
        it('should update an existing entity in collection, giving a new id', async () => {
            // test setup
            await mongoStore.insert({
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
                .select('test_entity_id_1');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_1_UPDATED);
            // function under test
            await mongoStore.update('test_entity_id_1', {
                id: 'test_entity_id_2',
                firstName: 'a first name entity',
                lastName: 'a last name entity',
                address: '123 address road',
                email: 'email@email.com'
            });
            const doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_1' });
            assert_1.strict.equal(doesEntityExist, false);
            selectedEntityString = await mongoStore
                .select('test_entity_id_2');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2_UPDATED_ID);
        });
        it('should update an existing entity in collection, with less fields', async () => {
            // test setup
            await mongoStore.insert({
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
                .select('test_entity_id_2');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2);
            // function under test
            await mongoStore.update('test_entity_id_2', {
                id: 'test_entity_id_2'
            });
            const doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_1' });
            assert_1.strict.equal(doesEntityExist, false);
            selectedEntityString = await mongoStore
                .select('test_entity_id_2');
            assert_1.strict.deepEqual(JSON.parse(selectedEntityString), TEST_ENTITY_2_SMALL_FIELDS);
        });
    });
    describe('delete() tests', () => {
        it('should delete an entity with many fields', async () => {
            // function under test
            await mongoStore.insert({
                id: 'test_entity_id_1',
                name: 'robert',
                age: 34,
                timeCreated: '2020-12-14'
            });
            // function under test
            const selectedEntityString = await mongoStore
                .delete('test_entity_id_1');
            const doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_1' });
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should delete an entity with many fields', async () => {
            // function under test
            await mongoStore.insert({
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
                .delete('test_entity_id_2');
            const doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_2' });
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should delete an entity with empty string fields', async () => {
            // function under test
            await mongoStore.insert({
                id: '',
                email: '',
                locationId: '',
                country: ''
            });
            // function under test
            const selectedEntityString = await mongoStore
                .delete('');
            const doesEntityExist = await mongoStore
                .existByField({ 'id': '' });
            assert_1.strict.equal(doesEntityExist, false);
        });
    });
    describe('existByField() tests', () => {
        it('should assert that entity exists collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_100' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_100', 'email@email.com');
            doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_100' });
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_99' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_99', 'email@email.com');
            doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_99' });
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity does not exist collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_1000' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_1000', 'email@email.com');
            doesEntityExist = await mongoStore
                .existByField({ 'id': 'test_entity_id_1001' });
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity exists collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'email': 'email@aol.com' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_109', 'email@aol.com');
            doesEntityExist = await mongoStore
                .existByField({ 'email': 'email@aol.com' });
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'email': 'anotheremail123@gmail.com' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_109', 'anotheremail123@gmail.com');
            doesEntityExist = await mongoStore
                .existByField({ 'email': 'anotheremail122@gmail.com' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': ' anotheremail123@gmail.com' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': 'anotheremail123@gmail.com' });
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity exists collection', async () => {
            let doesEntityExist = await mongoStore
                .existByField({ 'email': ' ' });
            assert_1.strict.equal(doesEntityExist, false);
            await insertUsers(1, 'test_entity_id_99', ' ');
            doesEntityExist = await mongoStore
                .existByField({ 'email': '' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': '  ' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': ' ' });
            assert_1.strict.equal(doesEntityExist, true);
        });
        it('should assert that entity does not exist collection', async () => {
            await insertUsers(3, 'test_entity_id_100', 'test_entity_email_100@yahoo.com');
            let doesEntityExist = await mongoStore
                .existByField({ 'email': 'test_entity_ email_100@yahoo.com' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': 'test_entity_email_100@yahoo.com ' });
            assert_1.strict.equal(doesEntityExist, false);
        });
        it('should assert that entity does not exist collection', async () => {
            await insertUsers(1, 'entity_id', undefined);
            let doesEntityExist = await mongoStore
                .existByField({ 'email': 'undefined' });
            assert_1.strict.equal(doesEntityExist, false);
            doesEntityExist = await mongoStore
                .existByField({ 'email': '' });
            assert_1.strict.equal(doesEntityExist, false);
        });
    });
    describe('getCount() tests', () => {
        it('should get entity count of 0', async () => {
            const entityCount = await mongoStore.getCount();
            assert_1.strict.equal(entityCount, 0);
        });
        it('should get entity count of 1', async () => {
            await insertUsers(1, 'entity_id', 'email@email.com');
            const entityCount = await mongoStore.getCount();
            assert_1.strict.equal(entityCount, 1);
        });
        it('should get entity count of 3', async () => {
            await insertUsers(3, 'entity_id', 'email@email.com');
            const entityCount = await mongoStore.getCount();
            assert_1.strict.equal(entityCount, 3);
        });
        it('should get entity count of 9', async () => {
            await insertUsers(9, 'entity_id', 'email@email.com');
            const entityCount = await mongoStore.getCount();
            assert_1.strict.equal(entityCount, 9);
        });
    });
});
