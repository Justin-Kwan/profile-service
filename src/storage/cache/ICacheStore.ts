
/**
 * interface contract for all cache access objects to follow
 * in implementation
 */
interface ICacheStore<T> {
  createConnection(): Promise<void>;
  insert(entityId: string, entity: T): Promise<void>;
  update(entityId: string, entity: T): Promise<void>;
  select(entityId: string): Promise<string>;
  delete(entityId: string): Promise<void>;
  existById(entityId: string): Promise<boolean>;
  clear(): Promise<void>;
  closeConnection(): void;
}

export { ICacheStore };
