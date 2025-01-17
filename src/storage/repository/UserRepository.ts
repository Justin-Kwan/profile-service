import { IUser } from '../../domain/entities/users/IUser';
import { IDatabaseStore } from '../database/IDatabaseStore';
import { ICacheStore } from '../cache/ICacheStore';
import { IUserSerializer } from '../../domain/user-serializers/IUserSerializer';

abstract class UserRepository<T extends IUser> {

  protected databaseStore: IDatabaseStore<T>;
  protected cacheStore: ICacheStore<T>;
  protected userSerializer: IUserSerializer<T>;

  /**
   * @param {IDatabaseStore<T>} - injected database access object
   * @param {ICacheStore<T>} - injected cache access object
   * @param {IUserSerializer<T>} - injected user object serializer
   */
  constructor(
    databaseStore: IDatabaseStore<T>,
    cacheStore: ICacheStore<T>,
    userSerializer: IUserSerializer<T>) {
    this.databaseStore = databaseStore;
    this.cacheStore = cacheStore;
    this.userSerializer = userSerializer;
  }

  /**
   * creates connections for datastore objects
   * @param {void}
   * @return {void}
   */
  async initDatastoreObjects(): Promise<void> {
    await Promise.all([
      this.databaseStore.createConnection(),
      this.cacheStore.createConnection()
    ]);
  }

  /**
   * inserts user into database collection and cache
   * precondition: user with same id must not exist in db or cache
   * @param {string} - id of user to insert
   * @param {T} - generic type
   * @return {void}
   * @effects - writes to database and cache
   * @effects - mongo client addes _id field to user object
   */
  async insert(user: T): Promise<void> {
    const userCopy: T = Object.assign({}, user);
    await Promise.all([
      this.databaseStore.insert(user),
      this.cacheStore.insert(user.getId(), userCopy)
    ]);
  }

  /**
   * updates user in database collection and cache
   * precondition: user must already exist in database
   * @param {string} - id of user to update
   * @param {T} - generic type
   * @return {void}
   * @effects - writes to database and cache
   * @effects - mongo client adds _id field to user object
   */
  async update(user: T): Promise<void> {
    const userCopy: T = Object.assign({}, user);
    await Promise.all([
      this.databaseStore.update(user.getId(), user),
      this.cacheStore.update(user.getId(), userCopy)
    ]);
  }

  /**
   * attempts to select user from cache, and if not in cache,
   * selects the user from database and updates cache
   * precondition: user with passed in id must exist in db or cache
   * @param {string} - id of user to update
   * @return {T} - generic object type of user
   */
  async select(userId: string): Promise<T> {
    let user: T;
    let userString: string;

    userString = await this.cacheStore.select(userId);
    const isUserNotInCache: boolean = userString === null;

    if (isUserNotInCache) {
      userString = await this.databaseStore.select(userId);
      user = this.userSerializer.deserialize(userString);
      this.cacheStore.update(userId, user);
    }

    user = this.userSerializer.deserialize(userString);
    return user;
  }

  /**
   * deletes user from database and cache based on user id
   * precondition: user with passed in id must exist in db
   * @param {string} - id of user to delete
   * @return {void}
   */
  async delete(userId: string): Promise<void> {
    await Promise.all([
      this.databaseStore.delete(userId),
      this.cacheStore.delete(userId)
    ]);
  }

  /**
   * determines if user exists in cache or database
   * @param {string} - id of user
   * @return {boolean}
   */
  async existById(userId: string): Promise<boolean> {
    const isUserInCache: boolean = await this.cacheStore
      .existById(userId);

    if (!isUserInCache) {
      const isUserInDb: boolean = await this.databaseStore
        .existByField({ id: userId });
      return isUserInDb;
    }

    return isUserInCache;
  }

  /**
   * determines if user exists in cache or database
   * based on email
   * @param {string} - email of user
   * @return {boolean}
   */
  async existByEmail(email: string): Promise<boolean> {
    const isUserInDb = await this.databaseStore
      .existByField({ 'email': email });
    return isUserInDb;
  }

  /**
   * determines if user exists in cache or database
   * based on mobile number
   * @param {string} - mobile number of user
   * @return {boolean}
   */
  async existByMobileNum(mobileNum: string): Promise<boolean> {
    const isUserInDb = await this.databaseStore
      .existByField({ 'mobileNum': mobileNum });
    return isUserInDb;
  }

  /**
   * gets total number of entities in database
   * @param {void}
   * @return {integer}
   */
  async getCount(): Promise<number> {
    return await this.databaseStore.getCount();
  }

  /**
   * deletes all entities in database and cache
   * precondition: user with same id must not exist in db or cache
   * @param {void}
   * @return {void}
   * @effects - deletes from database and cache
   */
  async clear(): Promise<void> {
    await Promise.all([
      this.databaseStore.clear(),
      this.cacheStore.clear()
    ]);
  }

  /**
   * deletes user collection from database
   * @param {void}
   * @return {void}
   * @effects - deletes from database
   */
  async dropCollection(): Promise<void> {
    await this.databaseStore.dropCollection();
  }

}

export { UserRepository };
