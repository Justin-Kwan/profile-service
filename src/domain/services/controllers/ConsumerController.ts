import { ConsumerRepository } from '../../../storage/repository/ConsumerRepository';
import { ConsumerFactory } from '../../services/factories/ConsumerFactory';
import { ConsumerSerializer } from '../../services/entity-serializers/ConsumerSerializer';
import { Consumer } from '../../entities/users/Consumer';
import {
  PERMISSION_DENIED,
  RESOURCE_WITH_ID_ALREADY_EXISTS,
  RESOURCE_WITH_EMAIL_ALREADY_EXISTS,
  RESOURCE_WITH_MOBILE_NUM_ALREADY_EXISTS,
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

  // check conflicting email and phone num
  async createConsumer(consumerId: string, consumerParams: string): Promise<string> {
    const consumer: Consumer = await this.consumerFactory
      .createNewConsumer(consumerId, consumerParams);

    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);
    const doesEmailExist: boolean = await this.consumerRepository
      .existByEmail(consumer.getEmail());
    const doesMobileNumExist: boolean = await this.consumerRepository
      .existByMobileNum(consumer.getMobileNum());

    if (doesIdExist) {
      return RESOURCE_WITH_ID_ALREADY_EXISTS;
    } if (doesEmailExist) {
      return RESOURCE_WITH_EMAIL_ALREADY_EXISTS;
    } if (doesMobileNumExist) {
      return RESOURCE_WITH_MOBILE_NUM_ALREADY_EXISTS;
    }

    await this.consumerRepository.insert(consumer);
    return "resource created";
  }

  // todo: check conflicting email and phone
  async updateConsumer(consumerId: string, consumerParams: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);
    const consumerObj = JSON.parse(consumerParams);

    consumer.setFirstName(consumerObj.firstName);
    consumer.setLastName(consumerObj.lastName);
    consumer.setEmail(consumerObj.email);
    consumer.setCountry(consumerObj.country);
    consumer.setLocationId(consumerObj.locationId);
    consumer.setMobileNum(consumerObj.mobileNum);
    consumer.setOrderZone(consumerObj.orderZone);
    this.consumerRepository.update(consumer);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async getConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async deleteConsumer(consumerId: string): Promise<string> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesConsumerExist) return RESOURCE_NOT_FOUND;

    await this.consumerRepository.delete(consumerId);
    return "user deleted";
  }

  // ok
  async doesConsumerExist(consumerId: string): Promise<boolean> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);
    return doesConsumerExist;
  }

}

export { ConsumerController };
