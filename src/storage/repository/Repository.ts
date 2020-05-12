import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';


abstract class Repository<T> {

  protected databaseName: string;
  protected collectionName: string;
  protected mongoStore: MongoStore<T>;
  protected redisStore: RedisStore<T>;
  private entitySerializer: any;

  /**
   * @param {string} - name of database to connect to
   * @param {string} - name of datbase collection to use
   * @param {any} - custom entity object serializer is injected
   */
  constructor(
    databaseName: string, collectionName: string, entitySerializer: any) {
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    this.entitySerializer = entitySerializer;
  }

  /**
   * instantiates data access objects and creates connections
   * to datastores
   * @param {void}
   * @return {void}
   */
  async initDatastoreObjects(): Promise<any> {
    this.mongoStore = new MongoStore<T>(
      this.databaseName,
      this.collectionName
    );
    this.redisStore = new RedisStore<T>();
    await Promise.all([
      this.mongoStore.createConnection(),
      this.redisStore.createConnection()
    ]);
  }

  /**
   * inserts new entity into database collection and cache
   * precondition: entity with same id must not exist in db or cache
   * @param {string} - id of entity to insert
   * @param {T} - generic type
   * @return {void}
   * @effects - writes to database and cache
   * @effects - mongo client addes _id field to entity object
   */
  async insertNewEntity(entityId: string, entity: T): Promise<void> {
    const dbEntity: T = Object.assign({}, entity);
    const cacheEntity: T = Object.assign({}, entity);

    await Promise.all([
      this.mongoStore.insertNewEntity(dbEntity),
      this.redisStore.insertNewEntity(entityId, cacheEntity)
    ]);
  }

  /**
   * updates entity in database collection and cache
   * precondition: entity must already exist in database
   * @param {string} - id of entity to update
   * @param {T} - generic type
   * @return {void}
   * @effects - writes to database and cache
   * @effects - mongo client adds _id field to entity object
   */
  async updateEntity(entityId: string, entity: T): Promise<void> {
    const dbEntity: T = Object.assign({}, entity);
    const cacheEntity: T = Object.assign({}, entity);

    await Promise.all([
      this.mongoStore.updateEntity(entityId, dbEntity),
      this.redisStore.updateEntity(entityId, cacheEntity)
    ]);
  }

  /**
   * attempts to select entity from cache, and if not in cache,
   * selects the entity from database and updates cache
   * precondition: entity with passed in id must exist in db or cache
   * @param {string} - id of entity to update
   * @return {T} - generic object type of entity
   */
  async selectEntity(entityId: string): Promise<T> {
    let entity: T;
    let entityString: string;

    entityString = await this.redisStore.selectEntity(entityId);
    const isEntityNotInCache: boolean = entityString === null;

    if (isEntityNotInCache) {
      entityString = await this.mongoStore.selectEntity(entityId);
      entity = this.entitySerializer.deserialize(entityString);
      this.redisStore.updateEntity(entityId, entity);
    }

    entity = this.entitySerializer.deserialize(entityString);
    return entity;
  }

  // test!
  async deleteEntity(entityId: string): Promise<any> {
    await Promise.all([
      this.mongoStore.deleteEntity(entityId),
      this.redisStore.deleteEntity(entityId)
    ]);
  }

  /**
   * determines if entity exists in cache or database
   * @param {string} - id of entity
   * @return {boolean}
   */
  async doesEntityExistById(entityId: string): Promise<boolean> {
    const isEntityInCache: boolean = await this.redisStore
      .doesEntityExistById(entityId);

    if (!isEntityInCache) {
      const isEntityInDb: boolean = await this.mongoStore
        .doesEntityExistByField({ id: entityId });
      return isEntityInDb;
    }

    return isEntityInCache;
  }

  /**
   * gets total number of entities in database
   * @param {void}
   * @return {integer}
   */
  async getEntityCount(): Promise<number> {
    return await this.mongoStore.getEntityCount();
  }

  /**
   * deletes all entities in database and cache
   * precondition: entity with same id must not exist in db or cache
   * @param {void}
   * @return {void}
   * @effects - deletes from database and cache
   */
  async clearEntities(): Promise<void> {
    await Promise.all([
      this.mongoStore.clearEntities(),
      this.redisStore.clearEntities()
    ]);
  }

  /**
   * deletes entity collection from database
   * @param {void}
   * @return {void}
   * @effects - deletes from database
   */
  async dropEntityCollection(): Promise<void> {
    await this.mongoStore.dropEntityCollection();
  }

}

export { Repository };
