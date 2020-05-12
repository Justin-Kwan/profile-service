import { Repository } from './Repository';
import { CourierSerializer } from '../../domain/entities/object-serializers/CourierSerializer';
import { Courier } from '../../domain/entities/users/Courier';

class CourierRepository extends Repository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_COLLECTION: string = 'Couriers';
    super(USER_DATABASE, COURIER_COLLECTION, new CourierSerializer());
  }

  async doesCourierExistByEmail(email: string): Promise<boolean> {
    const doesCourierExist = await this.mongoStore
      .doesEntityExistByField({ 'email': email });
    return doesCourierExist;
  }

}

export { CourierRepository };
