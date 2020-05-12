
/**
 * interface contract for all database access objects to follow
 * in implementation
 */
interface IDatabaseStore<T> {
  createConnection(): Promise<any>;
  insertNewEntity(entity: T): Promise<any>;
  updateEntity(entityId: string, entity: T): Promise<any>;
  selectEntity(entityId: string): Promise<string>;
  deleteEntity(entityId: string): Promise<any>;
  doesEntityExistByField(field: object): Promise<boolean>;
  getEntityCount(): Promise<number>;
  clearEntities(): Promise<any>;
  dropEntityCollection(): Promise<any>;
  closeConnection(): void;
}

export { IDatabaseStore };
