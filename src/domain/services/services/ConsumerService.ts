

class ConsumerService {


  createConsumer(consumerString: string): string {
    const consumer: Consumer = await this.consumerFactory
      .getEntity(consumerString);

    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumer.getId());

    if (doesConsumerExist) {
      return RESOURCE_ALREADY_EXISTS;
    }

    this.consumerRepository.insertNewEntity(consumer.getId(), consumer);
    return "resource created";
  }

  updateConsumer(consumerId: string, consumerString: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = this.consumerRepository
      .selectEntity(consumer.getId());

    // update neccessary fields
    consumer.setFirstName();
    consumer.setLastName();
    consumer.setEmail();
    consumer.setCountry();
    consumer.setLocationId();
    consumer.setMobileNum();
    consumer.setTimeCreated();
    consumer.stVerificationStatus();
    consumer.setDeletionStatus();

    this.consumerRepository.updateEntity(consumer.getId(), consumer);

    return consumer.toClientJson();
  }


}
