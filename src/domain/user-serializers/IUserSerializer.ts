
/**
 * functions common to all user object serializers
 */
interface IUserSerializer<T> {
  deserialize(userString: string): T;
  serializeForClient(user: T): object;
}

export { IUserSerializer };
