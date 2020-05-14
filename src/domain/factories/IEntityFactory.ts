
interface IEntityFactory<T> {
  createNew(entityId: string, entityString: string): T;
}

export { IEntityFactory };
