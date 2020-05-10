import { Repository } from './Repository';
import { CourierFactory } from '../../domain/entities/factories/CourierFactory';
import { Courier } from '../../domain/entities/users/Courier';

class CourierRepository extends Repository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_COLLECTION: string = 'Couriers';
    super(USER_DATABASE, COURIER_COLLECTION, new CourierFactory());
  }

  async doesCourierExistByEmail(email: string): Promise<boolean> {
    const doesCourierExist = await this.mongoStore
      .doesEntityExistByField({ 'email': email });
    return doesCourierExist;
  }

}

export { CourierRepository };
