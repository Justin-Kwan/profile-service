import { CourierRepository } from '../../storage/repository/CourierRepository';
import { CourierFactory } from '../factories/CourierFactory';
import { CourierSerializer } from '../entity-serializers/CourierSerializer';
import { Courier } from '../entities/users/Courier';
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

class CourierService {

  private readonly courierRepository: CourierRepository =
    new CourierRepository();

  private readonly courierFactory: CourierFactory =
    new CourierFactory();

  private readonly courierSerializer: CourierSerializer =
    new CourierSerializer();

  constructor() {
    this.courierRepository.initDatastoreObjects();
  }

  /**
   * creates new courier entity
   * @param {string} - id of courier to create
   * @param {any} - JSON object of courier fields for new courier
   * @return {object} - JSON response object (error or success)
   */
  async createCourier(courierId: string, courierParams: any): Promise<object> {
    const newEmail: string = courierParams.email;
    const newMobileNum: string = courierParams.mobileNum;

    const doesIdExist: boolean = await this.courierRepository
      .existById(courierId);
    const doesEmailExist: boolean = await this.courierRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.courierRepository
      .existByMobileNum(newMobileNum);

    if (doesIdExist) return RESOURCE_ID_ALREADY_EXISTS;
    if (doesEmailExist) return RESOURCE_EMAIL_ALREADY_EXISTS;
    if (doesMobileNumExist) return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

    const courier: Courier = await this.courierFactory
      .createNew(courierId, JSON.stringify(courierParams));
    await this.courierRepository.insert(courier);

    return RESOURCE_CREATED;
  }

  /**
   * updates courier entity by courier id, given new courier
   * field arguments
   * @param {string} - id of courier to update
   * @param {any} - JSON object of courier fields to update
   * @return {object} - JSON response object (error or courier)
   */
  async updateCourier(courierId: string, courierParams: any): Promise<object> {
    const newEmail: string = courierParams.email;
    const newMobileNum: string = courierParams.mobileNum;

    const doesIdExist: boolean = await this.courierRepository
      .existById(courierId);
    const doesEmailExist: boolean = await this.courierRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.courierRepository
      .existByMobileNum(newMobileNum);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const courier: Courier = await this.courierRepository
      .select(courierId);

    const isEmailDifferent: boolean =
      newEmail !== courier.getEmail();
    const isMobileNumDifferent: boolean =
      newMobileNum !== courier.getMobileNum();

    // if new email provided already exists
    if (isEmailDifferent && doesEmailExist)
      return RESOURCE_EMAIL_ALREADY_EXISTS;
    // if new mobile number provided already exists
    if (isMobileNumDifferent && doesMobileNumExist)
      return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

    courier.setFirstName(courierParams.firstName);
    courier.setLastName(courierParams.lastName);
    courier.setEmail(courierParams.email);
    courier.setCountry(courierParams.country);
    courier.setLocationId(courierParams.locationId);
    courier.setMobileNum(courierParams.mobileNum);
    courier.setVehicleType(courierParams.vehicleType);
    courier.setPreferredZone(courierParams.preferredZone);
    this.courierRepository.update(courier);

    return this.courierSerializer.serializeForClient(courier);
  }

  /**
   * gets courier entity by courier id
   * @param {string} - id of courier to get
   * @return {object} - JSON response object (error or courier)
   */
  async getCourier(courierId: string): Promise<object> {
    const doesIdExist: boolean = await this.courierRepository
      .existById(courierId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const courier: Courier = await this.courierRepository
      .select(courierId);
    return this.courierSerializer.serializeForClient(courier);
  }

  /**
   * deletes courier entity by courier id
   * @param {string} - id of courier to delete
   * @return {object} - JSON response object (error or success)
   */
  async deleteCourier(courierId: string): Promise<object> {
    const doesIdExist: boolean = await this.courierRepository
      .existById(courierId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    await this.courierRepository.delete(courierId);
    return RESOURCE_DELETED;
  }

}

export { CourierService };
