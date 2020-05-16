import 'mocha';
import { strict as assert } from 'assert';

import { Courier } from '../../../../src/domain/entities/users/Courier';

const courier = new Courier();

describe('Courier Tests', () => {

  describe('setVehicleType() & getVehicleType() tests', () => {
    it('should set an empty vehicle type', () => {
      courier.setVehicleType('');
      assert.equal(courier.getVehicleType(), '');
    });

    it('should set a short vehicle type', () => {
      courier.setVehicleType('test_vehicle_type_1');
      assert.equal(courier.getVehicleType(), 'test_vehicle_type_1');
    });
  });

  describe('setPreferredZone() & getPreferredZone()', () => {
    it('should set an empty preferred zone', () => {
      courier.setPreferredZone('');
      assert.equal(courier.getPreferredZone(), '');
    });

    it('should set a short preferred zone', () => {
      courier.setPreferredZone('test_preferred_zone_1');
      assert.equal(courier.getPreferredZone(), 'test_preferred_zone_1');
    });
  });

});
