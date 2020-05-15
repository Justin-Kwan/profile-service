import { UserRepository } from './UserRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Courier } from '../../domain/entities/users/Courier';
import { CourierSerializer } from '../../domain/user-serializers/CourierSerializer';

class CourierRepository extends UserRepository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_COLLECTION: string = 'Couriers';

    // injecting datastore and user dependencies to
    // base repository class
    super(
      new MongoStore<Courier>(USER_DATABASE, COURIER_COLLECTION),
      new RedisStore<Courier>(),
      new CourierSerializer()
    );
  }

}

export { CourierRepository };
