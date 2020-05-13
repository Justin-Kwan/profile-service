import { EntityRepository } from './EntityRepository';
import { MongoStore } from '../database/MongoStore';
import { RedisStore } from '../cache/RedisStore';
import { Courier } from '../../domain/entities/users/Courier';
import { CourierSerializer } from '../../domain/services/entity-serializers/CourierSerializer';

class CourierRepository extends EntityRepository<Courier> {

  constructor() {
    const USER_DATABASE: string = 'User_Profiles';
    const COURIER_COLLECTION: string = 'Couriers';

    // injecting datastore and entity dependencies to
    // base repository class
    super(
      new MongoStore<Courier>(USER_DATABASE, COURIER_COLLECTION),
      new RedisStore<Courier>(),
      new CourierSerializer()
    );
  }

  async existByEmail(email: string): Promise<boolean> {
    const doesCourierExist = await this.databaseStore
      .existByField({ 'email': email });
    return doesCourierExist;
  }

  async existByMobileNum(mobileNum: string): Promise<boolean> {
    const doesEntityExist = await this.databaseStore
      .existByField({ 'mobileNum': mobileNum });
    return doesEntityExist;
  }

}

export { CourierRepository };
