import { MockUser } from '../entities/users/MockUser';
import { IUserSerializer } from '../../../src/domain/user-serializers/IUserSerializer';

class MockUserSerializer implements IUserSerializer<MockUser> {

  deserialize(userString: string): MockUser {
    const userObj = JSON.parse(userString);
    const mockUser = new MockUser();
    mockUser.setId(userObj.id);
    mockUser.setFirstName(userObj.firstName);
    mockUser.setLastName(userObj.lastName);
    mockUser.setEmail(userObj.email);
    mockUser.setCountry(userObj.country);
    mockUser.setLocationId(userObj.locationId);
    mockUser.setMobileNum(userObj.mobileNum);
    mockUser.setTimeCreated(userObj.timeCreated);
    mockUser.setVerificationStatus(userObj.verificationStatus);
    return mockUser;
  }

  serializeForClient(mockUser: MockUser): object {
    return {
      firstName: mockUser.getFirstName(),
      lastName: mockUser.getLastName(),
      email: mockUser.getEmail(),
      country: mockUser.getCountry(),
      locationId: mockUser.getLocationId(),
      mobileNum: mockUser.getMobileNum()
    };
  }

}

export { MockUserSerializer };
