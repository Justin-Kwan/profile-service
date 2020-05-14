
import { IEntityFactory } from './IEntityFactory';
import { IEntitySerializer } from '../entity-serializers/IEntitySerializer';

class EntityService<T> {

  private readonly entityRepository: IEntityRepository<T>;
  private readonly IEntityFactory: EntityFactory<T>;
  private readonly entitySerializer: IEntitySerializer<T>;

  constructor() {
    
  }


}
