import 'mocha';
import { strict as assert } from 'assert';
import * as _ from "lodash";

import { CourierRepository } from '../../../src/storage/repository/CourierRepository';
import { Courier } from '../../../src/domain/entities/users/Courier';
import { CourierFactory } from '../../../src/domain/entities/factories/CourierFactory';

const courierRepository = new CourierRepository();
const courierFactory = new CourierFactory();

const TEST_COURIER_PARAMS_1: string = `{
  "id": "test_id_1",
  "firstName": "test_first_name_1",
  "lastName": "test_last_name_1",
  "email": "test_email_1",
  "country": "test_country_1",
  "locationId": "test_location_id_1",
  "mobileNum": "test_mobile_num_1",
  "timeCreated": "test_time_created_1",
  "verificationStatus": true,
  "deletionStatus": false,
  "vehicleType": "test_vehicle_type_1",
  "preferredZone": "test_preferred_zone_1",
  "inviteCode": "test_invite_code_1"
}`;

const TEST_COURIER_PARAMS_2: string = `{
  "id": "test_id_2",
  "firstName": "test_first_name_2",
  "lastName": "test_last_name_2",
  "email": "test_email_2",
  "country": "test_country_2",
  "locationId": "test_location_id_2",
  "mobileNum": "test_mobile_num_2",
  "timeCreated": "test_time_created_2",
  "verificationStatus": true,
  "deletionStatus": false,
  "vehicleType": "test_vehicle_type_2",
  "preferredZone": "test_preferred_zone_2",
  "inviteCode": "test_invite_code_2"
}`;

describe('CourierRepository tests', () => {

  before(async () => {
    await courierRepository.initDatastoreObjects();
  });

  afterEach(async () => {
    await courierRepository.clearEntities();
  });

  after(async () => {
    await courierRepository.dropEntityCollection();
  });

  describe('selectEntity() tests', () => {
    it('should select correct courier', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = await courierRepository.selectEntity('test_id_1');
      // assert type and field equality of objects
      assert(_.isEqual(expectedCourier, selectedCourier));
    });

    it('should select correct courier', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_2);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_2);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = await courierRepository.selectEntity('test_id_2');
      // assert type and field equality of objects
      assert(_.isEqual(expectedCourier, selectedCourier));
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const selectedCourier = async () => {
        await courierRepository.selectEntity('non_existent_id');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = async () => {
        await courierRepository.selectEntity('test_id_2');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_2);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_2);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = async () => {
        await courierRepository.selectEntity('test_id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = async () => {
        await courierRepository.selectEntity(' test_id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = async () => {
        await courierRepository.selectEntity('test_id_1 ');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });

    it('should throw error since no courier to select (invalid id)', async () => {
      const expectedCourier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const selectedCourier = async () => {
        await courierRepository.selectEntity('test_ id_1');
      }
      // assert promise rejection is thrown
      assert.rejects(
        selectedCourier,
        Error
      );
    });
  });

  describe('doesCourierExistByEmail() tests', () => {
    it('should assert that courier exists collection', async () => {
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const doesCourierExist = await courierRepository.doesCourierExistByEmail('test_email_1');
      assert.equal(doesCourierExist, true);
    });

    it('should assert that courier exists collection', async () => {
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_2);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      const doesCourierExist = await courierRepository.doesCourierExistByEmail('test_email_2');
      assert.equal(doesCourierExist, true);
    });

    it('should assert that courier does not exist in collection', async () => {
      let doesUserExist: boolean = await courierRepository.doesCourierExistByEmail('non_existent_user_email');
      assert.equal(doesUserExist, false);
    });

    it('should assert that courier does not exist in collection', async () => {
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      let doesUserExist: boolean = await courierRepository.doesCourierExistByEmail(' test_email_1');
      assert.equal(doesUserExist, false);
    });

    it('should assert that courier does not exist in collection', async () => {
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      let doesUserExist: boolean = await courierRepository.doesCourierExistByEmail('test_email_1 ');
      assert.equal(doesUserExist, false);
    });

    it('should assert that courier does not exist in collection', async () => {
      const courier = courierFactory.getEntity(TEST_COURIER_PARAMS_1);
      await courierRepository.insertNewEntity(courier.getId(), courier);
      let doesUserExist: boolean = await courierRepository.doesCourierExistByEmail('test_ email_1');
      assert.equal(doesUserExist, false);
    });
  });

});
