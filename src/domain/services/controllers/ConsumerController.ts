import { ConsumerRepository } from '../../../storage/repository/ConsumerRepository';
import { ConsumerFactory } from '../../entities/factories/ConsumerFactory';
import { ConsumerSerializer } from '../../entities/object-serializers/ConsumerSerializer';
import { Consumer } from '../../entities/users/Consumer';
import {
  PERMISSION_DENIED,
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from './ResponseErrors';

class ConsumerController {

  private readonly consumerRepository: ConsumerRepository =
    new ConsumerRepository();

  private readonly consumerFactory: ConsumerFactory =
    new ConsumerFactory();

  private readonly consumerSerializer: ConsumerSerializer =
    new ConsumerSerializer();

  constructor() {
    this.consumerRepository.initDatastoreObjects();
  }

  async createConsumer(consumerString: string): Promise<string> {
    const consumer: Consumer = await this.consumerFactory
      .getNewConsumer(consumerString);

    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumer.getId());

    if (doesConsumerExist) {
      return RESOURCE_ALREADY_EXISTS;
    }

    await this.consumerRepository
      .insertNewEntity(consumer.getId(), consumer);
    return "resource created";
  }

  async updateConsumer(consumerId: string, consumerString: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = await this.consumerRepository
      .selectEntity(consumerId);
    const consumerObj = JSON.parse(consumerString);

    // update neccessary fields
    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setOrderZone(consumerObj.orderZone);
    this.consumerRepository.updateEntity(consumer.getId(), consumer);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok (secure)
  async getConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = await this.consumerRepository
      .selectEntity(consumerId);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok (secure)
  async deleteConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = await this.consumerRepository
      .selectEntity(consumerId);
    consumer.flagAsDeleted();
    await this.consumerRepository
      .updateEntity(consumer.getId(), consumer);

    return "user deleted";
  }

}

export { ConsumerController };
