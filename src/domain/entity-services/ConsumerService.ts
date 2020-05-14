import { ConsumerRepository } from '../../storage/repository/ConsumerRepository';
import { ConsumerFactory } from '../factories/ConsumerFactory';
import { ConsumerSerializer } from '../entity-serializers/ConsumerSerializer';
import { Consumer } from '../entities/users/Consumer';
import {
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from './ResponseConstants';

class ConsumerService {

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

  // ok
  async createConsumer(consumerId: string, consumerParams: any): Promise<object> {
    const newEmail: string = consumerParams.email;
    const newMobileNum: string = consumerParams.mobileNum;

    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);
    const doesEmailExist: boolean = await this.consumerRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.consumerRepository
      .existByMobileNum(newMobileNum);

    if (doesIdExist) {
      return RESOURCE_ID_ALREADY_EXISTS;
    }
    if (doesEmailExist) {
      return RESOURCE_EMAIL_ALREADY_EXISTS;
    }
    if (doesMobileNumExist) {
      return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
    }

    const consumer: Consumer = await this.consumerFactory
      .createNew(consumerId, JSON.stringify(consumerParams));
    await this.consumerRepository.insert(consumer);

    return RESOURCE_CREATED;
  }

  // todo: handle checking if email and mobile num already exists
  //       on a different user
  async updateConsumer(consumerId: string, consumerParams: any): Promise<object> {
    const updatedEmail: string = consumerParams.email;
    const updatedMobileNum: string = consumerParams.mobileNum;

    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesIdExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);

    const doesEmailExist: boolean = await this.consumerRepository
      .existByEmail(updatedEmail);
    const doesMobileNumExist: boolean = await this.consumerRepository
      .existByMobileNum(updatedMobileNum);

    // if changing field but new field arg already exists
    if (updatedEmail !== consumer.getEmail()
      && doesEmailExist) {
      return RESOURCE_EMAIL_ALREADY_EXISTS;
    }
    if (updatedMobileNum !== consumer.getMobileNum()
      && doesMobileNumExist) {
      return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
    }

    // updating entity
    consumer.setFirstName(consumerParams.firstName);
    consumer.setLastName(consumerParams.lastName);
    consumer.setEmail(consumerParams.email);
    consumer.setCountry(consumerParams.country);
    consumer.setLocationId(consumerParams.locationId);
    consumer.setMobileNum(consumerParams.mobileNum);
    consumer.setOrderZone(consumerParams.orderZone);

    this.consumerRepository.update(consumer);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async getConsumer(consumerId: string): Promise<object> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);

    return this.consumerSerializer.serializeForClient(consumer);
  }

  // ok
  async deleteConsumer(consumerId: string): Promise<object> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesConsumerExist) {
      return RESOURCE_NOT_FOUND;
    }

    await this.consumerRepository.delete(consumerId);
    return RESOURCE_DELETED;
  }

  // ok
  async doesConsumerExist(consumerId: string): Promise<boolean> {
    const doesConsumerExist: boolean = await this.consumerRepository
      .existById(consumerId);
    return doesConsumerExist;
  }

}

export { ConsumerService };
