import { Consumer } from '../users/Consumer';

class ConsumerSerializer {

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
    consumer.setOrderZone(consumerObj.orderZone);
    consumer.setTimeCreated(consumerObj.timeCreated);
    consumer.setVerificationStatus(consumerObj.verificationStatus);
    return consumer;
  }

  /**
   * serializes consumer object into json string, hiding
   * sensitive values for web client
   * @param {Consumer}
   * @return {string}
   */
  serializeForClient(consumer: Consumer): string {
    return JSON.stringify({
      id: consumer.getId(),
      firstName: consumer.getFirstName(),
      lastName: consumer.getLastName(),
      email: consumer.getEmail(),
      country: consumer.getCountry(),
      locationId: consumer.getLocationId(),
      mobileNum: consumer.getMobileNum(),
      orderZone: consumer.getOrderZone()
    });
  }

}

export { ConsumerSerializer };
