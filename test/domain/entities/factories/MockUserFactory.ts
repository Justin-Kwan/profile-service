import { EntityFactory } from '../../../../src/domain/entities/factories/EntityFactory';
import { MockUser } from '../users/MockUser';

class MockUserFactory extends EntityFactory {

  getEntity(userJsonParams: string): MockUser {
    const userParams = JSON.parse(userJsonParams);
    const mockUser = new MockUser();
    mockUser.setId(userParams.id);
    mockUser.setFirstName(userParams.firstName);
    mockUser.setLastName(userParams.lastName);
    mockUser.setAddress(userParams.address);
    mockUser.setEmail(userParams.email);
    mockUser.setCountry(userParams.country);
    mockUser.setLocationId(userParams.locationId);
    mockUser.setMobileNum(userParams.mobileNum);
    mockUser.setTimeCreated(userParams.timeCreated);
    mockUser.setVerificationStatus(userParams.verificationStatus);
    mockUser.setDeletionStatus(userParams.deletionStatus);
    return mockUser;
  }

}

export { MockUserFactory };
