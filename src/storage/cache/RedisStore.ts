import * as redis from 'redis';

import { ICacheStore } from './ICacheStore';

class RedisStore<T> implements ICacheStore<T> {

  private readonly REDIS_HOST: string = '127.0.0.1';
  private readonly REDIS_PORT: number = 6380;
  private readonly MAX_EXPIRERY: number = 1000000; // 11 days

  private redisClient: redis.RedisClient;

  createConnection(): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.redisClient = redis.createClient(this.REDIS_PORT, this.REDIS_HOST);
      resolve();
    });

    return promise;
  }

  insertNewEntity(entityId: string, entity: T): Promise<any> {
    const entityString = JSON.stringify(entity);

    const promise = new Promise<any>((resolve, reject) => {
      this.redisClient.set(entityId, entityString, (err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  async updateEntity(entityId: string, entity: T): Promise<any> {
    await this.deleteEntity(entityId);
    await this.insertNewEntity(entityId, entity);
  }

  selectEntity(entityId: string): Promise<string> {
    const promise = new Promise<any>((resolve, reject) => {
      this.redisClient.get(entityId, (err, res) => {
        if (err) reject(err);
        const entityString: string = res;
        resolve(entityString);
      });
    });

    return promise;
  }

  doesEntityExistById(entityId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.redisClient.exists(entityId, (err, res) => {
        if (err) reject(err);
        const doesEntityExist: boolean = res === 1;
        resolve(doesEntityExist);
      });
    });

    return promise;
  }

  deleteEntity(entityId: string): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.redisClient.del(entityId, (err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  clearEntities(): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.redisClient.flushdb((err, res) => {
        if (err) reject(err);
        resolve();
      });
    });

    return promise;
  }

  closeConnection(): void {
    this.redisClient.quit();
  }

}

export { RedisStore };
