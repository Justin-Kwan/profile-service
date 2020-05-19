import { UserRepository } from './UserRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Courier } from '../../domain/entities/users/Courier';
import { CourierSerializer } from '../../domain/user-serializers/CourierSerializer';

class CourierRepository extends UserRepository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_DATABASE_COLLECTION: string = 'Couriers';
    const COURIER_CACHE_SET: number = 1;

    // injecting datastore and user dependencies to
    // base repository class
    super(
      new MongoStore<Courier>(USER_DATABASE, COURIER_DATABASE_COLLECTION),
      new RedisStore<Courier>(COURIER_CACHE_SET),
      new CourierSerializer()
    );
  }

}

export { CourierRepository };
