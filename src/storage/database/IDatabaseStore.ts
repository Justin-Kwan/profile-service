
/**
 * interface contract for all database access objects to follow
 * in implementation
 */
interface IDatabaseStore<T> {
  createConnection(): Promise<void>;
  insertNewEntity(entity: T): Promise<void>;
  updateEntity(entityId: string, entity: T): Promise<void>;
  selectEntity(entityId: string): Promise<string>;
  deleteEntity(entityId: string): Promise<void>;
  doesEntityExistByField(field: object): Promise<boolean>;
  getEntityCount(): Promise<number>;
  clearEntities(): Promise<void>;
  dropEntityCollection(): Promise<void>;
  closeConnection(): void;
}

export { IDatabaseStore };
