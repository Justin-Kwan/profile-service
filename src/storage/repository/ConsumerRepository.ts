import { EntityRepository } from './EntityRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Consumer } from '../../domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../domain/services/entity-serializers/ConsumerSerializer';

class ConsumerRepository extends EntityRepository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_COLLECTION: string = 'Consumers';

    // injecting datastore and entity dependencies to
    // base repository class
    super(
      new MongoStore<Consumer>(USER_DATABASE, CONSUMER_COLLECTION),
      new RedisStore<Consumer>(),
      new ConsumerSerializer()
    );
  }

  async existByEmail(email: string): Promise<boolean> {
    const doesEntityExist = await this.databaseStore
      .existByField({ 'email': email });
    return doesEntityExist;
  }

  async existByMobileNum(mobileNum: string): Promise<boolean> {
    const doesEntityExist = await this.databaseStore
      .existByField({ 'mobileNum': mobileNum });
    return doesEntityExist;
  }

}

export { ConsumerRepository };
