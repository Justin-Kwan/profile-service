import { User } from '../../../../src/domain/entities/users/User';

/**
 * mock user class for testing abstract User class
 */
class MockUser extends User {

  constructor() {
    super();
  }

}

export { MockUser };
