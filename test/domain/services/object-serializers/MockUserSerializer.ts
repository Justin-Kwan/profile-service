import { MockUser } from '../../entities/users/MockUser';

class MockUserSerializer {

  serialize(userJsonParams: string): MockUser {
    const userParams = JSON.parse(userJsonParams);
    const mockUser = new MockUser();
    mockUser.setId(userParams.id);
    mockUser.setFirstName(userParams.firstName);
    mockUser.setLastName(userParams.lastName);
    mockUser.setEmail(userParams.email);
    mockUser.setCountry(userParams.country);
    mockUser.setLocationId(userParams.locationId);
    mockUser.setMobileNum(userParams.mobileNum);
    mockUser.setTimeCreated(userParams.timeCreated);
    mockUser.setVerificationStatus(userParams.verificationStatus);
    return mockUser;
  }

}

export { MockUserSerializer };
