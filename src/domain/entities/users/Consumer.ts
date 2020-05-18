
import { User } from './User';

class Consumer extends User {

  constructor() {
    super();
  }

  updateFields(consumerParams: {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    locationId: string,
    mobileNum: string
  }): void {
    this.setFirstName(consumerParams.firstName);
    this.setLastName(consumerParams.lastName);
    this.setEmail(consumerParams.email);
    this.setCountry(consumerParams.country);
    this.setLocationId(consumerParams.locationId);
    this.setMobileNum(consumerParams.mobileNum);
  }

}

export { Consumer };
