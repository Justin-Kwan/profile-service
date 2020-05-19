import { UserRepository } from './UserRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Consumer } from '../../domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../domain/user-serializers/ConsumerSerializer';

class ConsumerRepository extends UserRepository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_DATABASE_COLLECTION: string = 'Consumers';
    const CONSUMER_CACHE_SET: number = 0;

    // injecting datastore and user dependencies to
    // base repository class
    super(
      new MongoStore<Consumer>(USER_DATABASE, CONSUMER_DATABASE_COLLECTION),
      new RedisStore<Consumer>(CONSUMER_CACHE_SET),
      new ConsumerSerializer()
    );
  }

}

export { ConsumerRepository };
