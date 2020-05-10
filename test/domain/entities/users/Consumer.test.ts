import 'mocha';
import { strict as assert } from 'assert';

import { Consumer } from '../../../../src/domain/entities/users/Consumer';

const consumer = new Consumer();

describe('Consumer Tests', () => {

  describe('setOrderZone() & getOrderZone() tests', () => {
    it('should set an empty order zone', () => {
      consumer.setOrderZone('');
      assert.equal(consumer.getOrderZone(), '');
    });

    it('should set a short vehicle type', () => {
      consumer.setOrderZone('test_order_zone_1');
      assert.equal(consumer.getOrderZone(), 'test_order_zone_1');
    });
  });

});
