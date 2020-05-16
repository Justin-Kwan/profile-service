import { UserService } from './UserService';
import { ConsumerRepository } from '../../storage/repository/ConsumerRepository';
import { ConsumerFactory } from '../factories/ConsumerFactory';
import { ConsumerSerializer } from '../user-serializers/ConsumerSerializer';
import { Consumer } from '../entities/users/Consumer';

class ConsumerService extends UserService<Consumer> {

  constructor() {
    super(
      new ConsumerRepository(),
      new ConsumerFactory(),
      new ConsumerSerializer()
    );
  }

}

export { ConsumerService };
