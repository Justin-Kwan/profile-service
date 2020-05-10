import 'mocha';
import { strict as assert } from 'assert';

import { Courier } from '../../../../src/domain/entities/users/Courier'

const courier = new Courier();

describe('Courier Tests', function() {

  describe('setVehicleType() & getVehicleType() tests', function() {
    it('should set an empty vehicle type', function() {
      courier.setVehicleType('');
      assert.equal(courier.getVehicleType(), '');
    });

    it('should set a short vehicle type', function() {
      courier.setVehicleType('test_vehicle_type_1');
      assert.equal(courier.getVehicleType(), 'test_vehicle_type_1');
    });
  });

  describe('setPreferredZone() & getPreferredZone()', function() {
    it('should set an empty preferred zone', function() {
      courier.setPreferredZone('');
      assert.equal(courier.getPreferredZone(), '');
    });

    it('should set a short preferred zone', function() {
      courier.setPreferredZone('test_preferred_zone_1');
      assert.equal(courier.getPreferredZone(), 'test_preferred_zone_1');
    });
  });

  describe('setInviteCode() & getInviteCode()', function() {
    it('should set an empty invite code', function() {
      courier.setInviteCode('');
      assert.equal(courier.getInviteCode(), '');
    });

    it('should set a short invite code', function() {
      courier.setInviteCode('test_invite_code_1');
      assert.equal(courier.getInviteCode(), 'test_invite_code_1');
    });
  });


});
