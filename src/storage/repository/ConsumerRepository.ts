import { Repository } from './Repository';
import { ConsumerFactory } from '../../domain/entities/factories/ConsumerFactory';
import { Consumer } from '../../domain/entities/users/Consumer';

class ConsumerRepository extends Repository<Consumer> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const CONSUMER_COLLECTION: string = 'Consumers';
    super(USER_DATABASE, CONSUMER_COLLECTION, new ConsumerFactory());
  }

  async doesConsumerExistByEmail(email: string): Promise<boolean> {
    const doesConsumerExist = await this.mongoStore
      .doesEntityExistByField({ 'email': email });
    return doesConsumerExist;
  }

}

export { ConsumerRepository };
