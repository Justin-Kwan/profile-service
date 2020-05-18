import 'mocha';
import { strict as assert } from 'assert';

import { CourierService } from '../../../src/domain/user-services/CourierService';
import { CourierRepository } from '../../../src/storage/repository/CourierRepository';
import {
  RESOURCE_CREATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from '../../../src/constants/ResponseConstants';

const TEST_COURIER_PARAMS_1: object = {
  firstName: 'test_first_name_1',
  lastName: 'test_last_name_1',
  email: 'test_email_1',
  country: 'test_country_1',
  locationId: 'test_location_id_1',
  mobileNum: 'test_mobile_num_1',
  vehicleType: 'test_vehicle_type_1'
};

const TEST_COURIER_RESPONSE_1: object = {
  body: {
    id: 'test_id_1',
    firstName: 'test_first_name_1',
    lastName: 'test_last_name_1',
    email: 'test_email_1',
    country: 'test_country_1',
    locationId: 'test_location_id_1',
    mobileNum: 'test_mobile_num_1',
    vehicleType: 'test_vehicle_type_1',
    verificationStatus: false
  },
  code: 200
};

const TEST_COURIER_PARAMS_SAME_EMAIL_1: object = {
  firstName: 'same_email_test_first_name_1',
  lastName: 'same_email_test_last_name_1',
  email: 'test_email_1',
  country: 'same_email_test_country_1',
  locationId: 'same_email_test_location_id_1',
  mobileNum: 'same_email_test_mobile_num_1',
  vehicleType: 'same_email_test_vehicle_type_1'
};

const TEST_COURIER_RESPONSE_SAME_EMAIL_1: object = {
  body: {
    id: 'test_id_1',
    firstName: 'same_email_test_first_name_1',
    lastName: 'same_email_test_last_name_1',
    email: 'test_email_1',
    country: 'same_email_test_country_1',
    locationId: 'same_email_test_location_id_1',
    mobileNum: 'same_email_test_mobile_num_1',
    vehicleType: 'same_email_test_vehicle_type_1',
    verificationStatus: false
  },
  code: 200
};

const TEST_COURIER_PARAMS_SAME_MOBILE_NUM_1: object = {
  firstName: 'same_mobile_num_test_first_name_1',
  lastName: 'same_mobile_num_test_last_name_1',
  email: 'same_mobile_num_test_email_1',
  country: 'same_mobile_num_test_country_1',
  locationId: 'same_mobile_num_test_location_id_1',
  mobileNum: 'test_mobile_num_1',
  vehicleType: 'same_mobile_num_test_vehicle_type_1'
};

const TEST_COURIER_RESPONSE_SAME_MOBILE_NUM_1: object = {
  body: {
    id: 'test_id_1',
    firstName: 'same_mobile_num_test_first_name_1',
    lastName: 'same_mobile_num_test_last_name_1',
    email: 'same_mobile_num_test_email_1',
    country: 'same_mobile_num_test_country_1',
    locationId: 'same_mobile_num_test_location_id_1',
    mobileNum: 'test_mobile_num_1',
    vehicleType: 'same_mobile_num_test_vehicle_type_1',
    verificationStatus: false
  },
  code: 200
};

const TEST_COURIER_PARAMS_UPDATED_1: object = {
  firstName: 'updated_test_first_name_1',
  lastName: 'updated_test_last_name_1',
  email: 'updated_test_email_1',
  country: 'updated_test_country_1',
  locationId: 'updated_test_location_id_1',
  mobileNum: 'updated_test_mobile_num_1',
  vehicleType: 'updated_test_vehicle_type_1'
};

const TEST_COURIER_RESPONSE_UPDATED_1: object = {
  body: {
    id: 'test_id_1',
    firstName: 'updated_test_first_name_1',
    lastName: 'updated_test_last_name_1',
    email: 'updated_test_email_1',
    country: 'updated_test_country_1',
    locationId: 'updated_test_location_id_1',
    mobileNum: 'updated_test_mobile_num_1',
    vehicleType: 'updated_test_vehicle_type_1',
    verificationStatus: false
  },
  code: 200
};

const TEST_COURIER_PARAMS_2: object = {
  firstName: 'test_first_name_2',
  lastName: 'test_last_name_2',
  email: 'test_email_2',
  country: 'test_country_2',
  locationId: 'test_location_id_2',
  mobileNum: 'test_mobile_num_2',
  vehicleType: 'test_vehicle_type_2'
};

const TEST_COURIER_RESPONSE_2: object = {
  body: {
    id: 'test_id_2',
    firstName: 'test_first_name_2',
    lastName: 'test_last_name_2',
    email: 'test_email_2',
    country: 'test_country_2',
    locationId: 'test_location_id_2',
    mobileNum: 'test_mobile_num_2',
    vehicleType: 'test_vehicle_type_2',
    verificationStatus: false
  },
  code: 200
};

const TEST_COURIER_PARAMS_UPDATED_2: object = {
  firstName: 'updated_test_first_name_2',
  lastName: 'updated_test_last_name_2',
  email: 'updated_test_email_2',
  country: 'updated_test_country_2',
  locationId: 'updated_test_location_id_2',
  mobileNum: 'updated_test_mobile_num_2',
  vehicleType: 'updated_test_vehicle_type_2'
};

const TEST_COURIER_RESPONSE_UPDATED_2: object = {
  body: {
    id: 'test_id_2',
    firstName: 'updated_test_first_name_2',
    lastName: 'updated_test_last_name_2',
    email: 'updated_test_email_2',
    country: 'updated_test_country_2',
    locationId: 'updated_test_location_id_2',
    mobileNum: 'updated_test_mobile_num_2',
    vehicleType: 'updated_test_vehicle_type_2',
    verificationStatus: false
  },
  code: 200
};

const courierService = new CourierService();
const courierRepository = new CourierRepository();

describe('CourierService Tests', async () => {

  before(async () => {
    await courierRepository.initDatastoreObjects();
  });

  afterEach(async () => {
    await courierRepository.clear();
  });

  after(async () => {
    await courierRepository.dropCollection();
  });

  describe('createUser() tests', async () => {
    it('should create a new courier', async () => {
      // asserting response
      // function under test
      const controllerResponse = await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      assert.equal(controllerResponse, RESOURCE_CREATED);
      // asserting side effect (inserting courier to db)
      // function under test
      const courierString = await courierService
        .getUser('test_id_1');
      assert.deepEqual(
        courierString,
        TEST_COURIER_RESPONSE_1
      );
    });

    it('should create a new courier', async () => {
      // asserting response
      // function under test
      const controllerResponse = await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      assert.equal(controllerResponse, RESOURCE_CREATED);
      // asserting side effect (inserting courier to db)
      // function under test
      const courierString = await courierService
        .getUser('test_id_2');
      assert.deepEqual(
        courierString,
        TEST_COURIER_RESPONSE_2
      );
    });

    it('should assert that a courier with same id already exists', async () => {
      // setup
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService.createUser(
        'test_id_2',
        TEST_COURIER_PARAMS_2
      );
      assert.deepEqual(
        controllerResponse,
        RESOURCE_ID_ALREADY_EXISTS
      );
    });

    it('should assert that a courier with same email already exists', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      // function under test
      const controllerResponse = await courierService.createUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        controllerResponse,
        RESOURCE_EMAIL_ALREADY_EXISTS
      );
    });

    it('should assert that a courier with same mobile number already exists', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      // function under test
      const controllerResponse = await courierService.createUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        controllerResponse,
        RESOURCE_MOBILE_NUM_ALREADY_EXISTS
      );
    });
  });

  describe('updateUser() tests', async () => {
    it('should update a single courier with all different fields', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_1',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_UPDATED_1
      );
    });

    it('should update a single courier with all different fields', async () => {
      // setup
      await courierService.createUser(
        'test_id_2',
        TEST_COURIER_PARAMS_2
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_2',
        TEST_COURIER_PARAMS_UPDATED_2
      );
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_UPDATED_2
      );
    });

    it('should update a single courier, keeping same email', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_1',
        TEST_COURIER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_SAME_EMAIL_1
      );
    });

    it('should update a single courier, keeping same mobile number', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_1',
        TEST_COURIER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_SAME_MOBILE_NUM_1
      );
    });

    it('should update a single courier, keeping all same fields', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_1
      );
    });

    it('should update a single courier with all different fields, without affecting other couriers', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      await courierService.createUser(
        'test_id_2',
        TEST_COURIER_PARAMS_2
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_1',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      // assert courier is updated
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_UPDATED_1
      );
      const unaffectedCourier = await courierService
        .getUser('test_id_2');
      // assert other courier is unaffected
      assert.deepEqual(
        unaffectedCourier,
        TEST_COURIER_RESPONSE_2
      );
    });

    it('should update a single courier with all different fields, without affecting other couriers', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      await courierService.createUser(
        'test_id_2',
        TEST_COURIER_PARAMS_2
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_2',
        TEST_COURIER_PARAMS_UPDATED_2
      );
      // assert courier is updated
      assert.deepEqual(
        updatedCourier,
        TEST_COURIER_RESPONSE_UPDATED_2
      );
      const unaffectedCourier = await courierService
        .getUser('test_id_1');
      // assert other courier is unaffected
      assert.deepEqual(
        unaffectedCourier,
        TEST_COURIER_RESPONSE_1
      );
    });

    it('should assert that resource is not found', async () => {
      // function under test
      const updatedCourier = await courierService.updateUser(
        'non_existent_id',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        updatedCourier,
        RESOURCE_NOT_FOUND
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'test_id_2',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      assert.deepEqual(
        updatedCourier,
        RESOURCE_NOT_FOUND
      );
    });

    // creating two users with different emails, then
    // updating one of the users to have same email as the other
    it('should assert that a courier with same email already exists', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      await courierService.createUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_SAME_EMAIL_1
      );
      assert.deepEqual(
        updatedCourier,
        RESOURCE_EMAIL_ALREADY_EXISTS
      );
    });

    // creating two users with different mobile numbers, then
    // updating one of the users to have same mobile number as the other
    it('should assert that a courier with same email already exists', async () => {
      // setup
      await courierService.createUser(
        'test_id_1',
        TEST_COURIER_PARAMS_1
      );
      await courierService.createUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_UPDATED_1
      );
      // function under test
      const updatedCourier = await courierService.updateUser(
        'new_test_id_1',
        TEST_COURIER_PARAMS_SAME_MOBILE_NUM_1
      );
      assert.deepEqual(
        updatedCourier,
        RESOURCE_MOBILE_NUM_ALREADY_EXISTS
      );
    });
  });

  describe('getUser() tests', async () => {
    it('should assert that resource is not found', async () => {
      // function under test
      const controllerResponse = await courierService
        .getUser('test_id_1');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      // function under test
      const controllerResponse = await courierService
        .getUser('test_id_2');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService
        .getUser('test_id_1');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });
  });

  describe('deleteUser() tests', async () => {
    it('should assert that resource is not found', async () => {
      // function under test
      const controllerResponse = await courierService
        .deleteUser('non_existent_id');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_2');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });

    it('should assert that resource is not found', async () => {
      // setup
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_1');
      assert.deepEqual(
        controllerResponse,
        RESOURCE_NOT_FOUND
      );
    });

    it('should delete a single courier', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_1');
      const doesDeletedCourierExist = await courierRepository
        .existById('test_id_1');
      assert.equal(doesDeletedCourierExist, false);
    });

    it('should delete a single courier', async () => {
      // setup
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_2');
      const doesDeletedCourierExist = await courierRepository
        .existById('test_id_2');
      assert.equal(doesDeletedCourierExist, false);
    });

    it('should delete a single courier without affecting other couriers', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_2');
      assert.equal(controllerResponse, RESOURCE_DELETED);
      const doesDeletedCourierExist = await courierRepository
        .existById('test_id_2');
      assert.equal(doesDeletedCourierExist, false);
      const existById = await courierRepository
        .existById('test_id_1');
      assert.equal(existById, true);
    });

    it('should delete a single courier without affecting other couriers', async () => {
      // setup
      await courierService
        .createUser('test_id_1', TEST_COURIER_PARAMS_1);
      await courierService
        .createUser('test_id_2', TEST_COURIER_PARAMS_2);
      // function under test
      const controllerResponse = await courierService
        .deleteUser('test_id_1');
      assert.equal(controllerResponse, RESOURCE_DELETED);
      const doesDeletedCourierExist = await courierRepository
        .existById('test_id_1');
      assert.equal(doesDeletedCourierExist, false);
      const existById = await courierRepository
        .existById('test_id_2');
      assert.equal(existById, true);
    });
  });

});
