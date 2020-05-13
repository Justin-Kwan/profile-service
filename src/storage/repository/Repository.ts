import { IDatabaseStore } from '../database/IDatabaseStore';
import { ICacheStore } from '../cache/ICacheStore';
import { IEntity } from '../../domain/entities/IEntity';
import { IEntitySerializer } from '../../domain/services/entity-serializers/IEntitySerializer';


abstract class Repository<T extends IEntity> {

  protected databaseStore: IDatabaseStore<T>;
  protected cacheStore: ICacheStore<T>;
  private entitySerializer: IEntitySerializer<T>;

  /**
   * @param {IDatabaseStore<T>} - injected database access object
   * @param {ICacheStore<T>} - injected cache access object
   * @param {IEntitySerializer<T>} - injected entity object serializer
   */
  constructor(databaseStore: IDatabaseStore<T>,
              cacheStore: ICacheStore<T>,
              entitySerializer: IEntitySerializer<T>) {
    this.databaseStore = databaseStore;
    this.cacheStore = cacheStore;
    this.entitySerializer = entitySerializer;
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
   * inserts new entity into database collection and cache
   * precondition: entity with same id must not exist in db or cache
   * @param {string} - id of entity to insert
   * @param {T} - generic type
   * @return {void}
   * @effects - writes to database and cache
   * @effects - mongo client addes _id field to entity object
   */
  async insertNewEntity(entity: T): Promise<void> {
    const entityCopy: T = Object.assign({}, entity);
    await Promise.all([
      this.databaseStore.insertNewEntity(entity),
      this.cacheStore.insertNewEntity(entity.getId(), entityCopy)
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
  async updateEntity(entity: T): Promise<void> {
    const entityCopy: T = Object.assign({}, entity);
    await Promise.all([
      this.databaseStore.updateEntity(entity.getId(), entity),
      this.cacheStore.updateEntity(entity.getId(), entityCopy)
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

    entityString = await this.cacheStore.selectEntity(entityId);
    const isEntityNotInCache: boolean = entityString === null;

    if (isEntityNotInCache) {
      entityString = await this.databaseStore.selectEntity(entityId);
      entity = this.entitySerializer.deserialize(entityString);
      this.cacheStore.updateEntity(entityId, entity);
    }

    entity = this.entitySerializer.deserialize(entityString);
    return entity;
  }

  /**
   * deletes entity from database and cache based on entity id
   * precondition: entity with passed in id must exist in db
   * @param {string} - id of entity to delete
   * @return {void}
   */
  async deleteEntity(entityId: string): Promise<void> {
    await Promise.all([
      this.databaseStore.deleteEntity(entityId),
      this.cacheStore.deleteEntity(entityId)
    ]);
  }

  /**
   * determines if entity exists in cache or database
   * @param {string} - id of entity
   * @return {boolean}
   */
  async doesEntityExistById(entityId: string): Promise<boolean> {
    const isEntityInCache: boolean = await this.cacheStore
      .doesEntityExistById(entityId);

    if (!isEntityInCache) {
      const isEntityInDb: boolean = await this.databaseStore
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
    return await this.databaseStore.getEntityCount();
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
      this.databaseStore.clearEntities(),
      this.cacheStore.clearEntities()
    ]);
  }

  /**
   * deletes entity collection from database
   * @param {void}
   * @return {void}
   * @effects - deletes from database
   */
  async dropEntityCollection(): Promise<void> {
    await this.databaseStore.dropEntityCollection();
  }

}

export { Repository };
