import { UserRepository } from './UserRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Consumer } from '../../domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../domain/user-serializers/ConsumerSerializer';

class ConsumerRepository extends UserRepository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_COLLECTION: string = 'Consumers';

    // injecting datastore and user dependencies to
    // base repository class
    super(
      new MongoStore<Consumer>(USER_DATABASE, CONSUMER_COLLECTION),
      new RedisStore<Consumer>(),
      new ConsumerSerializer()
    );
  }

}

export { ConsumerRepository };
