"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const Consumer_1 = require("../../../../src/domain/entities/users/Consumer");
const consumer = new Consumer_1.Consumer();
describe('Consumer Tests', () => {
    describe('setOrderZone() & getOrderZone() tests', () => {
        it('should set an empty order zone', () => {
            consumer.setOrderZone('');
            assert_1.strict.equal(consumer.getOrderZone(), '');
        });
        it('should set a short vehicle type', () => {
            consumer.setOrderZone('test_order_zone_1');
            assert_1.strict.equal(consumer.getOrderZone(), 'test_order_zone_1');
        });
    });
});
