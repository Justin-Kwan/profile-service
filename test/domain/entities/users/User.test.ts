import 'mocha';
import { strict as assert } from 'assert';

import { MockUser } from './MockUser';

const mockUser = new MockUser();

/**
 * unit testing abstract User class via mock user object
 */
describe('MockUser Tests', () => {

  describe('setId() & getId() tests', () => {
    it('should set an empty id', () => {
      mockUser.setId('');
      assert.equal(mockUser.getId(), '');
    });

    it('should set a short id', () => {
      mockUser.setId('test_id_1');
      assert.equal(mockUser.getId(), 'test_id_1');
    });
  });

  describe('setFirstName() & getFirstName() tests', () => {
    it('should set an empty first name', () => {
      mockUser.setFirstName('');
      assert.equal(mockUser.getFirstName(), '');
    });

    it('should set a short first name', () => {
      mockUser.setFirstName('test_first_name_1');
      assert.equal(mockUser.getFirstName(), 'test_first_name_1');
    });
  });

  describe('setLastName() & getLastName() tests', () => {
    it('should set an empty last name', () => {
      mockUser.setLastName('');
      assert.equal(mockUser.getLastName(), '');
    });

    it('should set a short last name', () => {
      mockUser.setLastName('test_last_name_1');
      assert.equal(mockUser.getLastName(), 'test_last_name_1');
    });
  });

  describe('setEmail() & getEmail() tests', () => {
    it('should set an empty email', () => {
      mockUser.setEmail('');
      assert.equal(mockUser.getEmail(), '');
    });

    it('should set a short email', () => {
      mockUser.setEmail('test_email_1');
      assert.equal(mockUser.getEmail(), 'test_email_1');
    });
  });

  describe('setCountry() & getCountry() tests', () => {
    it('should set an empty country', () => {
      mockUser.setCountry('');
      assert.equal(mockUser.getCountry(), '');
    });

    it('should set a short country', () => {
      mockUser.setCountry('test_country_1');
      assert.equal(mockUser.getCountry(), 'test_country_1');
    });
  });

  describe('setLocationId() & getLocationId() tests', () => {
    it('should set an empty location id', () => {
      mockUser.setLocationId('');
      assert.equal(mockUser.getLocationId(), '');
    });

    it('should set a short location id', () => {
      mockUser.setLocationId('test_location_id_1');
      assert.equal(mockUser.getLocationId(), 'test_location_id_1');
    });
  });

  describe('setMobileNum() & getMobileNum() tests', () => {
    it('should set an empty mobile number', () => {
      mockUser.setMobileNum('');
      assert.equal(mockUser.getMobileNum(), '');
    });

    it('should set a short mobile number', () => {
      mockUser.setMobileNum('test_mobile_num_1');
      assert.equal(mockUser.getMobileNum(), 'test_mobile_num_1');
    });
  });

  describe('setTimeCreated() & getTimeCreated() tests', () => {
    it('should set an empty time of creation', () => {
      mockUser.setTimeCreated('');
      assert.equal(mockUser.getTimeCreated(), '');
    });

    it('should set a short time of creation', () => {
      mockUser.setTimeCreated('test_toc_1');
      assert.equal(mockUser.getTimeCreated(), 'test_toc_1');
    });
  });

  describe('flagAsVerified() & isVerified() tests', () => {
    it('should flag mockUser as verified', () => {
      assert.equal(mockUser.isVerified(), false);
      mockUser.flagAsVerified();
      assert.equal(mockUser.isVerified(), true);
    });
  });

});
