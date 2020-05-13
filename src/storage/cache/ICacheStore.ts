
/**
 * interface contract for all cache access objects to follow
 * in implementation
 */
interface ICacheStore<T> {
  createConnection(): Promise<void>;
  insertNewEntity(entityId: string, entity: T): Promise<void>;
  updateEntity(entityId: string, entity: T): Promise<void>;
  selectEntity(entityId: string): Promise<string>;
  deleteEntity(entityId: string): Promise<void>;
  doesEntityExistById(entityId: string): Promise<boolean>;
  clearEntities(): Promise<void>;
  closeConnection(): void;
}

export { ICacheStore };
