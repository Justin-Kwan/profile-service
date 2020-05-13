import { Repository } from './Repository';
import { Consumer } from '../../domain/entities/users/Consumer';
import { ConsumerSerializer } from '../../domain/services/entity-serializers/ConsumerSerializer';

class ConsumerRepository extends Repository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_COLLECTION: string = 'Consumers';
    super(USER_DATABASE, CONSUMER_COLLECTION, new ConsumerSerializer());
  }

  async doesConsumerExistByEmail(email: string): Promise<boolean> {
    const doesConsumerExist = await this.mongoStore
      .doesEntityExistByField({ 'email': email });
    return doesConsumerExist;
  }

}

export { ConsumerRepository };
