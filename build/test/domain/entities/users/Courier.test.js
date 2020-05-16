"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const Courier_1 = require("../../../../src/domain/entities/users/Courier");
const courier = new Courier_1.Courier();
describe('Courier Tests', () => {
    describe('setVehicleType() & getVehicleType() tests', () => {
        it('should set an empty vehicle type', () => {
            courier.setVehicleType('');
            assert_1.strict.equal(courier.getVehicleType(), '');
        });
        it('should set a short vehicle type', () => {
            courier.setVehicleType('test_vehicle_type_1');
            assert_1.strict.equal(courier.getVehicleType(), 'test_vehicle_type_1');
        });
    });
    describe('setPreferredZone() & getPreferredZone()', () => {
        it('should set an empty preferred zone', () => {
            courier.setPreferredZone('');
            assert_1.strict.equal(courier.getPreferredZone(), '');
        });
        it('should set a short preferred zone', () => {
            courier.setPreferredZone('test_preferred_zone_1');
            assert_1.strict.equal(courier.getPreferredZone(), 'test_preferred_zone_1');
        });
    });
});
