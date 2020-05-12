
class ConsumerSerializer {

  deserialize(): Consumer {
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
    consumer.setDeletionStatus(consumerObj.deletionStatus);
    return consumer;
  }

  serializeForClient(): string {

  }


}
