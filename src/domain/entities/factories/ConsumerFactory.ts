import moment from 'moment';

import { EntityFactory } from './EntityFactory';
import { Consumer } from '../users/Consumer';

class ConsumerFactory extends EntityFactory {

  constructor() {
    super();
  }

  createNewConsumer(consumerId: string, consumerString: string): Consumer {
    const consumerObj = JSON.parse(consumerString);
    const consumer: Consumer = new Consumer();
    consumer.setId(consumerId);
    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setOrderZone(consumerObj.orderZone);
    consumer.setTimeCreated(moment().format());
    consumer.setVerificationStatus(false);
    return consumer;
  }

}

export { ConsumerFactory };
