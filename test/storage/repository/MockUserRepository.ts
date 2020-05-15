import { MongoStore } from  '../../../src/storage/database/MongoStore';
import { RedisStore } from  '../../../src/storage/cache/RedisStore';
import { UserRepository } from '../../../src/storage/repository/UserRepository';
import { MockUser } from '../../domain/entities/users/MockUser';
import { MockUserSerializer } from '../../domain/user-serializers/MockUserSerializer';

/**
 * mock repository class for testing abstract Repository class
 */
class MockUserRepository extends UserRepository<MockUser> {

  constructor() {
    const TEST_DATABASE: string = 'Test_Database';
    const TEST_COLLECTION: string = 'Test Collection';

    // injecting datastore and user dependencies to
    // base repository class
    super(
      new MongoStore(TEST_DATABASE, TEST_COLLECTION),
      new RedisStore(),
      new MockUserSerializer()
    );
  }

}

export { MockUserRepository };
