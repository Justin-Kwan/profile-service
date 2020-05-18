import { IUserSerializer } from './IUserSerializer';
import { Consumer } from '../entities/users/Consumer';

class ConsumerSerializer implements IUserSerializer<Consumer> {

  /**
   * deserializes consumer json string into consumer object, copying
   * all fields
   * @param {string}
   * @return {Consumer}
   */
  deserialize(consumerString: string): Consumer {
    const consumerObj = JSON.parse(consumerString);
    const consumer: Consumer = new Consumer();
    consumer.setId(consumerObj.id);
    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setTimeCreated(consumerObj.timeCreated);
    consumer.setVerificationStatus(consumerObj.verificationStatus);
    return consumer;
  }

  /**
   * serializes consumer object into json string, filtering
   * out sensitive fields for web client
   * @param {Consumer}
   * @return {string}
   */
  serializeForClient(consumer: Consumer): object {
    return {
      id: consumer.getId(),
      firstName: consumer.getFirstName(),
      lastName: consumer.getLastName(),
      email: consumer.getEmail(),
      country: consumer.getCountry(),
      locationId: consumer.getLocationId(),
      mobileNum: consumer.getMobileNum(),
      verificationStatus: consumer.isVerified()
    };
  }

}

export { ConsumerSerializer };
