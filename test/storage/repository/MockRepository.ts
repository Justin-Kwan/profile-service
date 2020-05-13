import { MongoStore } from  '../../../src/storage/database/MongoStore';
import { RedisStore } from  '../../../src/storage/cache/RedisStore';
import { Repository } from '../../../src/storage/repository/Repository';
import { MockUser } from '../../domain/entities/users/MockUser';
import { MockUserSerializer } from '../../domain/services/entity-serializers/MockUserSerializer';

/**
 * mock repository class for testing abstract Repository class
 */
class MockRepository extends Repository<MockUser> {

  constructor() {
    const TEST_DATABASE: string = 'Test_Database';
    const TEST_COLLECTION: string = 'Test Collection';

    // injecting datastore and entity dependencies to
    // base repository class
    super(
      new MongoStore(TEST_DATABASE, TEST_COLLECTION),
      new RedisStore(),
      new MockUserSerializer()
    );
  }

}

export { MockRepository };
