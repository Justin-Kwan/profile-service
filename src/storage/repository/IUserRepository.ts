import { IUser } from '../../domain/entities/users/IUser';

interface IUserRepository<T extends IUser> {
  initDatastoreObjects(): Promise<void>;
  insert(user: T): Promise<void>;
  update(user: T): Promise<void>;
  select(userId: string): Promise<T>;
  delete(userId: string): Promise<void>;
  existById(userId: string): Promise<boolean>;
  existByEmail(email: string): Promise<boolean>;
  existByMobileNum(mobileNum: string): Promise<boolean>;
  getCount(): Promise<number>;
  clear(): Promise<void>;
  dropCollection(): Promise<void>;
}

export { IUserRepository };
