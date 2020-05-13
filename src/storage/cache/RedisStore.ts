import * as redis from 'redis';

import { ICacheStore } from './ICacheStore';

class RedisStore<T> implements ICacheStore<T> {

  private readonly REDIS_HOST: string = '127.0.0.1';
  private readonly REDIS_PORT: number = 6380;

  private redisClient: redis.RedisClient;

  /**
	 * creates redis client connection
   * precondition: redis client must be disconnected
	 * @param {void}
	 * @return {void}
	 */
  createConnection(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.redisClient = redis.createClient(this.REDIS_PORT, this.REDIS_HOST);
      resolve();
    });

    return promise;
  }

  /**
	 * inserts key value pair with the entity id as the key and
   * the entity string as the value
	 * precondition: redis client must be connected
   *               entity must have unique id field
   * @param {string} - id of entity to insert
	 * @param {T} - generic type
   * @return {void}
	 * @effects writes to redis store
	 */
  insert(entityId: string, entity: T): Promise<void> {
    const entityString = JSON.stringify(entity);

    const promise = new Promise<void>((resolve, reject) => {
      this.redisClient.set(entityId, entityString, (err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  /**
   * updates entity string in redis store with same id (deleting
   * pre-existing key value store and inserting a new one)
   * precondition: redis client must be connected
   * @param {string} - id of entity to update
   * @param {T} - generic type
   * @return {void}
   * @effects writes to redis store
   */
  async update(entityId: string, entity: T): Promise<void> {
    await this.delete(entityId);
    await this.insert(entityId, entity);
  }

  /**
	 * selects entity string given entity id as the key
	 * precondition: redis client must be connected
   *               entity must exist in collection
	 * @param {string} - id of entity to select
	 * @return {Error / string} - throws error or returns string
   *                            representation of object
	 */
  select(entityId: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      this.redisClient.get(entityId, (err, res) => {
        if (err) reject(err);
        const entityString: string = res;
        resolve(entityString);
      });
    });

    return promise;
  }

  /**
   * deletes entity string from redis store given entity id
   * precondition: redis client must be connected
   *               entity must exist in redis store
   * @param {string} - id of entity to delete
   * @return {void}
   */
  delete(entityId: string): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.redisClient.del(entityId, (err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  /**
	 * determines if entity string is in redis store based on
   * id of entity
   * precondition: redis client must be connected
   *               correct entity id must be passed in
	 * @param {object} - entity id field object
	 * @returns {boolean} - represents if entity exists
	 */
  existById(entityId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.redisClient.exists(entityId, (err, res) => {
        if (err) reject(err);
        const doesEntityExist: boolean = res === 1;
        resolve(doesEntityExist);
      });
    });

    return promise;
  }

  /**
   * clears redis store of entity string key value pairs
   * precondition: redis client must be connected
   * @param {void}
   * @return {void}
   * @effects clears redis store
   */
  clear(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.redisClient.flushdb((err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  /**
   * closes redis client connection
   * precondition: redis client must be connected
   * @param {void}
   * @return {void}
   */
  closeConnection(): void {
    this.redisClient.quit();
  }

}

export { RedisStore };
