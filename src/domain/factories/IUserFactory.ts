
interface IUserFactory<T> {
  createNew(entityId: string, entityString: string): T;
}

export { IUserFactory };
