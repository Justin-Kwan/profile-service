import { Repository } from '../../../src/storage/repository/Repository';
import { MockUser } from '../../domain/entities/users/MockUser';
import {
  MockUserSerializer
} from '../../domain/entities/object-serializers/MockUserSerializer';

/**
 * mock repository class for testing abstract Repository class
 */
class MockRepository extends Repository<MockUser> {

  constructor() {
    const TEST_DB: string = 'Test_Database';
    const TEST_COLLECTION: string = 'Test Collection';
    super(TEST_DB, TEST_COLLECTION, new MockUserSerializer());
  }

}

export { MockRepository };
