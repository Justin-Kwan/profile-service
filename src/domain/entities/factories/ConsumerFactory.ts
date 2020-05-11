import { EntityFactory } from './EntityFactory';
import { Consumer } from '../users/Consumer';

class ConsumerFactory extends EntityFactory {

  constructor() {
    super();
  }

  getEntity(consumerString: string): Consumer {
    const consumerObj = JSON.parse(consumerString);
    const consumer: Consumer = new Consumer();
    consumer.setId(consumerObj.id);
    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setAddress(consumerObj.address);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setTimeCreated(consumerObj.timeCreated);
    consumer.setVerificationStatus(consumerObj.verificationStatus);
    consumer.setDeletionStatus(consumerObj.deletionStatus);
    consumer.setOrderZone(consumerObj.orderZone);
    return consumer;
  }

}

export { ConsumerFactory };
