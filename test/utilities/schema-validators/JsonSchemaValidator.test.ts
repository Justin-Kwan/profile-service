import 'mocha';
import { strict as assert } from 'assert';

import { JsonSchemaValidator } from '../../../src/utilities/schema-validators/JsonSchemaValidator';

const TEST_JSON_BODY_1: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_2: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eigh@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_3: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'e@baaa.c',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'Bicycle Vehicle'
};

const TEST_JSON_BODY_INVALID_FIRST_NAME_1: object = {
  firstName: '',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_FIRST_NAME_2: object = {
  firstName: null,
  lastName: 'l',
  email: 'eight@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_FIRST_NAME_3: object = {
  firstName: undefined,
  lastName: 'l',
  email: 'eight@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_FIRST_NAME_4: object = {
  firstName: true,
  lastName: 'l',
  email: 'eight@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_FIRST_NAME_5: object = {
  firstName: 1,
  lastName: 'l',
  email: 'eight@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_EMAIL_1: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eightb.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_EMAIL_2: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eigh@test',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_EMAIL_3: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'a@b.c',
  country: 'Canada',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};


const TEST_JSON_BODY_INVALID_COUNTRY_1: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eigh@tb.c',
  country: 'Canad',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_COUNTRY_2: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'United states',
  locationId: 'test_location_id_1',
  mobileNum: '1234567890',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_MOBILE_NUM_1: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '123456789',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_MOBILE_NUM_2: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '90555555556',
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_MOBILE_NUM_3: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: 9055555555,
  vehicleType: 'On Foot'
};

const TEST_JSON_BODY_INVALID_VEHICLE_TYPE_1: object = {
  firstName: 'n',
  lastName: 'l',
  email: 'eight@b.c',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9055555555',
  vehicleType: 'Motor Vehicl'
};

const TEST_JSON_BODY_MISSING_FIRST_NAME: object = {
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_LAST_NAME: object = {
  firstName: 'test_first_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_EMAIL: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_COUNTRY: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_LOCATION_ID: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  mobileNum: '9000000000',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_MOBILE_NUM: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  locationId: 'test_location_id_1',
  vehicleType: 'Motor Vehicle'
};

const TEST_JSON_BODY_MISSING_VEHICLE_TYPE: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1@gmail.com',
  country: 'United States',
  locationId: 'test_location_id_1',
  mobileNum: '9000000000'
};

const COURIER_SCHEMA: string = 'courier schema';
const jsonSchemaValidator = new JsonSchemaValidator();

describe('JsonSchemaValidator Tests', () => {

  describe('isJsonBodyValid() tests', () => {
    it('should assert json body follows schema', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, true);
    });

    it('should assert json body follows schema', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, true);
    });

    it('should assert json body follows schema', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_3,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, true);
    });

    it('should assert json body violates schema (invalid first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_FIRST_NAME_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_FIRST_NAME_2,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_FIRST_NAME_3,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_FIRST_NAME_4,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_FIRST_NAME_5,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid email)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_EMAIL_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid email)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_EMAIL_2,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid email)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_EMAIL_3,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid country)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_COUNTRY_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid country)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_COUNTRY_2,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid mobile number)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_MOBILE_NUM_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid mobile number)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_MOBILE_NUM_2,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid mobile number)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_MOBILE_NUM_3,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (invalid vehicle type)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_INVALID_VEHICLE_TYPE_1,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing first name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_FIRST_NAME,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing last name)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_LAST_NAME,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing email)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_EMAIL,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing country)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_COUNTRY,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing location id)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_LOCATION_ID,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing mobile number)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_MOBILE_NUM,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });

    it('should assert json body violates schema (missing vehicle type)', async () => {
      const isJsonBodyValid = await jsonSchemaValidator.isJsonBodyValid(
        TEST_JSON_BODY_MISSING_VEHICLE_TYPE,
        COURIER_SCHEMA
      );
      assert.equal(isJsonBodyValid, false);
    });
  });

});
