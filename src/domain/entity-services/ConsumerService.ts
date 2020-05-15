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

  /**
   * creates new consumer entity
   * @param {string} - id of consumer to create
   * @param {any} - JSON object of consumer fields for new consumer
   * @return {object} - JSON response object (error or success)
   */
  async createConsumer(consumerId: string, consumerParams: any): Promise<object> {
    const newEmail: string = consumerParams.email;
    const newMobileNum: string = consumerParams.mobileNum;

    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);
    const doesEmailExist: boolean = await this.consumerRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.consumerRepository
      .existByMobileNum(newMobileNum);

    if (doesIdExist) return RESOURCE_ID_ALREADY_EXISTS;
    if (doesEmailExist) return RESOURCE_EMAIL_ALREADY_EXISTS;
    if (doesMobileNumExist) return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

    const consumer: Consumer = await this.consumerFactory
      .createNew(consumerId, JSON.stringify(consumerParams));
    await this.consumerRepository.insert(consumer);

    return RESOURCE_CREATED;
  }

  /**
   * updates consumer entity by consumer id, given new consumer
   * field arguments
   * @param {string} - id of consumer to update
   * @param {any} - JSON object of consumer fields to update
   * @return {object} - JSON response object (error or consumer)
   */
  async updateConsumer(consumerId: string, consumerParams: any): Promise<object> {
    const newEmail: string = consumerParams.email;
    const newMobileNum: string = consumerParams.mobileNum;

    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);
    const doesEmailExist: boolean = await this.consumerRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.consumerRepository
      .existByMobileNum(newMobileNum);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);

    const isEmailDifferent: boolean =
      newEmail !== consumer.getEmail();
    const isMobileNumDifferent: boolean =
      newMobileNum !== consumer.getMobileNum();

    // if new email provided already exists
    if (isEmailDifferent && doesEmailExist)
      return RESOURCE_EMAIL_ALREADY_EXISTS;
    // if new mobile number provided already exists
    if (isMobileNumDifferent && doesMobileNumExist)
      return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

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

  /**
   * gets consumer entity by consumer id
   * @param {string} - id of consumer to get
   * @return {object} - JSON response object (error or consumer)
   */
  async getConsumer(consumerId: string): Promise<object> {
    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const consumer: Consumer = await this.consumerRepository
      .select(consumerId);
    return this.consumerSerializer.serializeForClient(consumer);
  }

  /**
   * deletes consumer entity by consumer id
   * @param {string} - id of consumer to delete
   * @return {object} - JSON response object (error or success)
   */
  async deleteConsumer(consumerId: string): Promise<object> {
    const doesIdExist: boolean = await this.consumerRepository
      .existById(consumerId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    await this.consumerRepository.delete(consumerId);
    return RESOURCE_DELETED;
  }

}

export { ConsumerService };
