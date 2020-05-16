import { IUser } from '../entities/users/IUser';
import { IUserFactory } from '../factories/IUserFactory';
import { IUserSerializer } from '../user-serializers/IUserSerializer';
import {
  RESOURCE_CREATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
} from './ResponseConstants';

abstract class UserService<T extends IUser> {

  protected readonly userRepository: any;
  protected readonly userFactory: IUserFactory<T>;
  protected readonly userSerializer: IUserSerializer<T>;

  constructor(
    userRepository: any,
    userFactory: IUserFactory<T>,
    userSerializer: IUserSerializer<T>) {
    this.userRepository = userRepository;
    this.userFactory = userFactory;
    this.userSerializer = userSerializer;
    this.userRepository.initDatastoreObjects();
  }

  /**
   * creates new user user
   * @param {string} - id of user to create
   * @param {any} - JSON object of user fields for new user
   * @return {object} - JSON response object (error or success)
   */
  async createUser(userId: string, userParams: any): Promise<object> {
    const newEmail: string = userParams.email;
    const newMobileNum: string = userParams.mobileNum;

    const doesIdExist: boolean = await this.userRepository
      .existById(userId);
    const doesEmailExist: boolean = await this.userRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.userRepository
      .existByMobileNum(newMobileNum);

    if (doesIdExist) return RESOURCE_ID_ALREADY_EXISTS;
    if (doesEmailExist) return RESOURCE_EMAIL_ALREADY_EXISTS;
    if (doesMobileNumExist) return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

    const user: T = await this.userFactory
      .createNew(userId, JSON.stringify(userParams));
    await this.userRepository.insert(user);

    return RESOURCE_CREATED;
  }

  /**
   * updates user user by user id, given new user
   * field arguments
   * @param {string} - id of user to update
   * @param {any} - JSON object of user fields to update
   * @return {object} - JSON response object (error or user)
   */
  async updateUser(userId: string, userParams: any): Promise<object> {
    const newEmail: string = userParams.email;
    const newMobileNum: string = userParams.mobileNum;

    const doesIdExist: boolean = await this.userRepository
      .existById(userId);
    const doesEmailExist: boolean = await this.userRepository
      .existByEmail(newEmail);
    const doesMobileNumExist: boolean = await this.userRepository
      .existByMobileNum(newMobileNum);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const user: T = await this.userRepository.select(userId);

    const isEmailDifferent: boolean =
      newEmail !== user.getEmail();
    const isMobileNumDifferent: boolean =
      newMobileNum !== user.getMobileNum();

    // if new email provided already exists
    if (isEmailDifferent && doesEmailExist)
      return RESOURCE_EMAIL_ALREADY_EXISTS;
    // if new mobile number provided already exists
    if (isMobileNumDifferent && doesMobileNumExist)
      return RESOURCE_MOBILE_NUM_ALREADY_EXISTS;

    user.updateFields(userParams);
    this.userRepository.update(user);

    return {
      body: this.userSerializer.serializeForClient(user),
      code: 200
    };
  }

  /**
   * gets user user by user id
   * @param {string} - id of user to get
   * @return {object} - JSON response object (error or user)
   */
  async getUser(userId: string): Promise<object> {
    const doesIdExist: boolean = await this.userRepository
      .existById(userId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    const user: T = await this.userRepository.select(userId);
    return {
      body: this.userSerializer.serializeForClient(user),
      code: 200
    };
  }

  /**
   * deletes user user by user id
   * @param {string} - id of user to delete
   * @return {object} - JSON response object (error or success)
   */
  async deleteUser(userId: string): Promise<object> {
    const doesIdExist: boolean = await this.userRepository
      .existById(userId);

    if (!doesIdExist) return RESOURCE_NOT_FOUND;

    await this.userRepository.delete(userId);
    return RESOURCE_DELETED;
  }

}

export { UserService };
