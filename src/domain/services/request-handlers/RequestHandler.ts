

abstract class UserRequestHandler<T> {

  // private id: string;
  // private firstName: string;
  // private lastName: string;
  // private address: string;
  // private email: string;
  // private country: string;
  // private locationId: string;
  // private mobileNum: string;
  // private timeCreated: string;
  // private verificationStatus: boolean = false;
  // private deletionStatus: boolean = false;

  private consumerRepository: Repository;
  private courierRepository: Repository;

  constructor() {
    this.repository = repository;
  }

  handleCreateUser(userString: string, userType: string): string {
    const consumer: Consumer = this.consumerFactory
      .getConsumer(userString);

    const doesUserExist: boolean = consumerRepository
      .doesEntityExistById(consumer.getId());

    if (doesUserExist) {
      return USER_ALREADY_EXISTS_ERROR;
    }

    repository.insertNewEntity(consumer);
  }

  handleUpdateUser(userString: string): string {
    const consumer: Consumer = this.consumerFactory
      .getConsumer(userString);

    const doesUserExist: boolean = consumerRepository
      .doesEntityExistById(consumer.getId());

    if (!doesUserExist) {
      return USER_ID_INVALID_ERROR;
    }

    repository.updateEntity(consumer.getId(), consumer);
  }

  handleGetUser(userId: string): string {
    const doesUserExist: boolean = consumerRepository
      .doesEntityExistById(userId);

    if (!doesUserExist) {
      return USER_ID_INVALID_ERROR;
    }

    const consumer: T = this.repository.selectEntity(userId);
    return JSON.stringify(consumer);
  }

  handleDeleteUser(userString: string): string {
    const doesUserExist: boolean = consumerRepository
      .doesEntityExistById(userId);

    if (!doesUserExist) {
      return USER_ID_INVALID_ERROR;
    }

    const consumer: Consumer = await this.repository.selectEntity(userId);
    consumer.flagAsDeleted();
    await this.repository.updateEntity(consumer.getId(), consumer);
    return USER_DELETE_SUCCESS;
  }

}

export { RequestHandler };
