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

  updateUserObject(consumerParams: any, consumer: Consumer): Consumer {
    consumer.setFirstName(consumerParams.firstName);
    consumer.setLastName(consumerParams.lastName);
    consumer.setEmail(consumerParams.email);
    consumer.setCountry(consumerParams.country);
    consumer.setLocationId(consumerParams.locationId);
    consumer.setMobileNum(consumerParams.mobileNum);
    consumer.setOrderZone(consumerParams.orderZone);
    return consumer;
  }

}

export { ConsumerService };
