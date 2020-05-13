import { ConsumerRepository } from '../../../storage/repository/ConsumerRepository';
import { ConsumerFactory } from '../../services/factories/ConsumerFactory';
import { ConsumerSerializer } from '../../services/entity-serializers/ConsumerSerializer';
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

  // TODO: figure out proper returns
  //       add extra functions for getting specific fields
  //       figure out how to organize interfaces, folders

  // ok (ish)
  async createConsumer(consumerId: string, consumerParams: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (doesConsumerExist) return RESOURCE_ALREADY_EXISTS;

    const consumer: Consumer = await this.consumerFactory
      .createNewConsumer(consumerId, consumerParams);

    await this.consumerRepository.insertNewEntity(consumer);
    return "resource created";
  }

  async updateConsumer(consumerId: string, consumerParams: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .selectEntity(consumerId);
    const consumerObj = JSON.parse(consumerParams);

    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setOrderZone(consumerObj.orderZone);
    this.consumerRepository.updateEntity(consumer);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async getConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .selectEntity(consumerId);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async deleteConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    await this.consumerRepository.deleteEntity(consumerId);
    return "user deleted";
  }

  // ok
  async doesConsumerExist(consumerId: string): Promise<boolean> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .doesEntityExistById(consumerId);
    return doesConsumerExist;
  }

}

export { ConsumerController };
