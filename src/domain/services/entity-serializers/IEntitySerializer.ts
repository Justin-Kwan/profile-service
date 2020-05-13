
/**
 * functions common to all entity object serializers
 */
interface IEntitySerializer<T> {
  deserialize(entityString: string): T;
  serializeForClient(entity: T): string;
}

export { IEntitySerializer };
