import moment from 'moment';

import { EntityFactory } from './EntityFactory';
import { Consumer } from '../users/Consumer';

class ConsumerFactory extends EntityFactory {

  constructor() {
    super();
  }

  getNewConsumer(consumerString: string): Consumer {
    const consumerObj = JSON.parse(consumerString);
    const consumer: Consumer = new Consumer();
    consumer.setId(consumerObj.id);
    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setOrderZone(consumerObj.orderZone);
    consumer.setTimeCreated(moment().format());
    consumer.setVerificationStatus(false);
    consumer.setDeletionStatus(false);
    return consumer;
  }

}

export { ConsumerFactory };
