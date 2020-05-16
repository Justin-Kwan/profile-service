"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const ConsumerFactory_1 = require("../../../src/domain/factories/ConsumerFactory");
const test_consumer_1 = {
    id: 'test_id_1',
    firstName: 'test_first_name_1',
    lastName: 'test_last_name_1',
    email: 'test_email_1',
    country: 'test_country_1',
    locationId: 'test_location_id_1',
    mobileNum: 'test_mobile_num_1',
    orderZone: 'test_order_zone_1'
};
const test_consumer_2 = {
    id: 'test_id_2',
    firstName: 'test_first_name_2',
    lastName: 'test_last_name_2',
    email: 'test_email_2',
    country: 'test_country_2',
    locationId: 'test_location_id_2',
    mobileNum: 'test_mobile_num_2',
    orderZone: 'test_order_zone_2'
};
const consumerFactory = new ConsumerFactory_1.ConsumerFactory();
const REPOSITORY_CALLER = 'repository';
describe('ConsumerFactory Tests', () => {
    describe('createNewConsumer() tests', () => {
        it('should create a consumer object', () => {
            const consumer = consumerFactory.createNew('test_id_1', `{
        "firstName": "test_first_name_1",
        "lastName": "test_last_name_1",
        "email": "test_email_1",
        "country": "test_country_1",
        "locationId": "test_location_id_1",
        "mobileNum": "test_mobile_num_1",
        "orderZone": "test_order_zone_1"
      }`);
            // asserting object type equality
            assert_1.strict.equal(consumer.constructor.name, 'Consumer');
            assert_1.strict.equal(consumer.getId(), test_consumer_1.id);
            assert_1.strict.equal(consumer.getFirstName(), test_consumer_1.firstName);
            assert_1.strict.equal(consumer.getLastName(), test_consumer_1.lastName);
            assert_1.strict.equal(consumer.getEmail(), test_consumer_1.email);
            assert_1.strict.equal(consumer.getCountry(), test_consumer_1.country);
            assert_1.strict.equal(consumer.getLocationId(), test_consumer_1.locationId);
            assert_1.strict.equal(consumer.getMobileNum(), test_consumer_1.mobileNum);
            assert_1.strict.equal(consumer.getOrderZone(), test_consumer_1.orderZone);
            assert_1.strict(consumer.getTimeCreated() !== null);
            assert_1.strict.equal(consumer.isVerified(), false);
        });
        it('should create a consumer object', () => {
            const consumer = consumerFactory.createNew('test_id_2', `{
        "firstName": "test_first_name_2",
        "lastName": "test_last_name_2",
        "email": "test_email_2",
        "country": "test_country_2",
        "zipCode": "test_zip_code_2",
        "locationId": "test_location_id_2",
        "mobileNum": "test_mobile_num_2",
        "orderZone": "test_order_zone_2"
      }`);
            // asserting object type equality
            assert_1.strict.equal(consumer.constructor.name, 'Consumer');
            assert_1.strict.equal(consumer.getId(), test_consumer_2.id);
            assert_1.strict.equal(consumer.getFirstName(), test_consumer_2.firstName);
            assert_1.strict.equal(consumer.getLastName(), test_consumer_2.lastName);
            assert_1.strict.equal(consumer.getEmail(), test_consumer_2.email);
            assert_1.strict.equal(consumer.getCountry(), test_consumer_2.country);
            assert_1.strict.equal(consumer.getLocationId(), test_consumer_2.locationId);
            assert_1.strict.equal(consumer.getMobileNum(), test_consumer_2.mobileNum);
            assert_1.strict.equal(consumer.getOrderZone(), test_consumer_2.orderZone);
            assert_1.strict(consumer.getTimeCreated() !== null);
            assert_1.strict.equal(consumer.isVerified(), false);
        });
    });
});
