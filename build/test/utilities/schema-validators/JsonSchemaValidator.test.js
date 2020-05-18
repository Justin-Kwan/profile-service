"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const JsonSchemaValidator_1 = require("../../../src/utilities/schema-validators/JsonSchemaValidator");
const TEST_JSON_BODY_1 = {
    firstName: 'test_first_name_1',
    lastName: 'test_last_name_1',
    email: 'test_email_1@gmail.com',
    country: 'United States',
    locationId: 'test_location_id_1',
    mobileNum: '9000000000',
    vehicleType: 'Motor Vehicle'
};
const TEST_JSON_BODY_2 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eigh@b.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_3 = {
    firstName: 'n',
    lastName: 'l',
    email: 'e@baaa.c',
    country: 'United States',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'Bicycle Vehicle'
};
const TEST_JSON_BODY_INVALID_FIRST_NAME_1 = {
    firstName: '',
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_FIRST_NAME_2 = {
    firstName: null,
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_FIRST_NAME_3 = {
    firstName: undefined,
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_FIRST_NAME_4 = {
    firstName: true,
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_FIRST_NAME_5 = {
    firstName: 1,
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_EMAIL_1 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_EMAIL_2 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eigh@test',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_EMAIL_3 = {
    firstName: 'n',
    lastName: 'l',
    email: 'a@b.c',
    country: 'Canada',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_COUNTRY_1 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'Canad',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_COUNTRY_2 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'United states',
    locationId: 'test_location_id_1',
    mobileNum: '1234567890',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_MOBILE_NUM_1 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'United states',
    locationId: 'test_location_id_1',
    mobileNum: '123456789',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_MOBILE_NUM_2 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'United states',
    locationId: 'test_location_id_1',
    mobileNum: '90555555556',
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_MOBILE_NUM_3 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'United states',
    locationId: 'test_location_id_1',
    mobileNum: 9055555555,
    vehicleType: 'On Foot'
};
const TEST_JSON_BODY_INVALID_VEHICLE_TYPE_1 = {
    firstName: 'n',
    lastName: 'l',
    email: 'eightb.c',
    country: 'United states',
    locationId: 'test_location_id_1',
    mobileNum: 9055555555,
    vehicleType: 'Motor Vehicl'
};
const JSON_SCHEMA_FILE_PATH = '../../../test/utilities/schema-validators/mock-schema.json';
const jsonSchemaValidator = new JsonSchemaValidator_1.JsonSchemaValidator(JSON_SCHEMA_FILE_PATH);
describe('JsonSchemaValidator Tests', () => {
    describe('isJsonBodyValid() tests', () => {
        it('should assert json body follows schema', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_1);
            assert_1.strict.equal(isJsonBodyValid, true);
        });
        it('should assert json body follows schema', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_1);
            assert_1.strict.equal(isJsonBodyValid, true);
        });
        it('should assert json body follows schema', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_3);
            assert_1.strict.equal(isJsonBodyValid, true);
        });
        it('should assert json body violates schema (invalid first name)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_FIRST_NAME_1);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid first name)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_FIRST_NAME_2);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid first name)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_FIRST_NAME_3);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid first name)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_FIRST_NAME_4);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid first name)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_FIRST_NAME_5);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid email)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_EMAIL_1);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid email)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_EMAIL_2);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid email)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_EMAIL_3);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid country)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_COUNTRY_1);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid country)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_COUNTRY_2);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid mobile number)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_MOBILE_NUM_1);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid mobile number)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_MOBILE_NUM_2);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid mobile number)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_MOBILE_NUM_3);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
        it('should assert json body violates schema (invalid vehicle type)', async () => {
            const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(TEST_JSON_BODY_INVALID_VEHICLE_TYPE_1);
            assert_1.strict.equal(isJsonBodyValid, false);
        });
    });
});
