"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = require("assert");
const MockUser_1 = require("./MockUser");
const mockUser = new MockUser_1.MockUser();
/**
 * unit testing abstract User class via mock user object
 */
describe('MockUser Tests', () => {
    describe('setId() & getId() tests', () => {
        it('should set an empty id', () => {
            mockUser.setId('');
            assert_1.strict.equal(mockUser.getId(), '');
        });
        it('should set a short id', () => {
            mockUser.setId('test_id_1');
            assert_1.strict.equal(mockUser.getId(), 'test_id_1');
        });
    });
    describe('setFirstName() & getFirstName() tests', () => {
        it('should set an empty first name', () => {
            mockUser.setFirstName('');
            assert_1.strict.equal(mockUser.getFirstName(), '');
        });
        it('should set a short first name', () => {
            mockUser.setFirstName('test_first_name_1');
            assert_1.strict.equal(mockUser.getFirstName(), 'test_first_name_1');
        });
    });
    describe('setLastName() & getLastName() tests', () => {
        it('should set an empty last name', () => {
            mockUser.setLastName('');
            assert_1.strict.equal(mockUser.getLastName(), '');
        });
        it('should set a short last name', () => {
            mockUser.setLastName('test_last_name_1');
            assert_1.strict.equal(mockUser.getLastName(), 'test_last_name_1');
        });
    });
    describe('setEmail() & getEmail() tests', () => {
        it('should set an empty email', () => {
            mockUser.setEmail('');
            assert_1.strict.equal(mockUser.getEmail(), '');
        });
        it('should set a short email', () => {
            mockUser.setEmail('test_email_1');
            assert_1.strict.equal(mockUser.getEmail(), 'test_email_1');
        });
    });
    describe('setCountry() & getCountry() tests', () => {
        it('should set an empty country', () => {
            mockUser.setCountry('');
            assert_1.strict.equal(mockUser.getCountry(), '');
        });
        it('should set a short country', () => {
            mockUser.setCountry('test_country_1');
            assert_1.strict.equal(mockUser.getCountry(), 'test_country_1');
        });
    });
    describe('setLocationId() & getLocationId() tests', () => {
        it('should set an empty location id', () => {
            mockUser.setLocationId('');
            assert_1.strict.equal(mockUser.getLocationId(), '');
        });
        it('should set a short location id', () => {
            mockUser.setLocationId('test_location_id_1');
            assert_1.strict.equal(mockUser.getLocationId(), 'test_location_id_1');
        });
    });
    describe('setMobileNum() & getMobileNum() tests', () => {
        it('should set an empty mobile number', () => {
            mockUser.setMobileNum('');
            assert_1.strict.equal(mockUser.getMobileNum(), '');
        });
        it('should set a short mobile number', () => {
            mockUser.setMobileNum('test_mobile_num_1');
            assert_1.strict.equal(mockUser.getMobileNum(), 'test_mobile_num_1');
        });
    });
    describe('setTimeCreated() & getTimeCreated() tests', () => {
        it('should set an empty time of creation', () => {
            mockUser.setTimeCreated('');
            assert_1.strict.equal(mockUser.getTimeCreated(), '');
        });
        it('should set a short time of creation', () => {
            mockUser.setTimeCreated('test_toc_1');
            assert_1.strict.equal(mockUser.getTimeCreated(), 'test_toc_1');
        });
    });
    describe('flagAsVerified() & isVerified() tests', () => {
        it('should flag mockUser as verified', () => {
            assert_1.strict.equal(mockUser.isVerified(), false);
            mockUser.flagAsVerified();
            assert_1.strict.equal(mockUser.isVerified(), true);
        });
    });
});
