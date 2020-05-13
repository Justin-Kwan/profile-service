import { Repository } from './Repository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Courier } from '../../domain/entities/users/Courier';
import { CourierSerializer } from '../../domain/services/entity-serializers/CourierSerializer';

class CourierRepository extends Repository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_COLLECTION: string = 'Couriers';

    // injecting datastore and entity dependencies to
    // base repository class
    super(
      new MongoStore(USER_DATABASE, COURIER_COLLECTION),
      new RedisStore(),
      new CourierSerializer()
    );
  }

  async doesCourierExistByEmail(email: string): Promise<boolean> {
    const doesCourierExist = await this.databaseStore
      .doesEntityExistByField({ 'email': email });
    return doesCourierExist;
  }

}

export { CourierRepository };
