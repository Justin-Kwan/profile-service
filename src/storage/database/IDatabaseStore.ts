
/**
 * interface contract for all database access objects to follow
 * in implementation
 */
interface IDatabaseStore<T> {
  createConnection(): Promise<void>;
  insert(entity: T): Promise<void>;
  update(entityId: string, entity: T): Promise<void>;
  select(entityId: string): Promise<string>;
  delete(entityId: string): Promise<void>;
  existByField(field: object): Promise<boolean>;
  getCount(): Promise<number>;
  clear(): Promise<void>;
  dropCollection(): Promise<void>;
  closeConnection(): void;
}

export { IDatabaseStore };
