import { Repository } from './Repository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Consumer } from '../../domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../domain/services/entity-serializers/ConsumerSerializer';

class ConsumerRepository extends Repository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_COLLECTION: string = 'Consumers';

    // injecting datastore and entity dependencies to
    // base repository class
    super(
      new MongoStore(USER_DATABASE, CONSUMER_COLLECTION),
      new RedisStore(),
      new ConsumerSerializer()
    );
  }

  async doesConsumerExistByEmail(email: string): Promise<boolean> {
    const doesConsumerExist = await this.databaseStore
      .doesEntityExistByField({ 'email': email });
    return doesConsumerExist;
  }

}

export { ConsumerRepository };
