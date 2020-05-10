
/**
 * interface contract for all cache access objects to follow
 * in implementation
 */
interface ICacheStore<T> {
  createConnection(): Promise<any>;
  insertNewEntity(entityId: string, entity: T): Promise<any>;
  updateEntity(entityId: string, entity: T): Promise<any>;
  selectEntity(entityId: string): Promise<string>;
  doesEntityExistById(entityId: string): Promise<boolean>;
  deleteEntity(entityId: string): Promise<any>;
  clearEntities(): Promise<any>;
  closeConnection(): void;
}

export { ICacheStore };
