
import { User } from './User';

class Consumer extends User {

  private orderZone: string;

  constructor() {
    super();
  }

  updateFields(consumerParams: {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    locationId: string,
    mobileNum: string,
    orderZone: string
  }): void {
    this.setFirstName(consumerParams.firstName);
    this.setLastName(consumerParams.lastName);
    this.setEmail(consumerParams.email);
    this.setCountry(consumerParams.country);
    this.setLocationId(consumerParams.locationId);
    this.setMobileNum(consumerParams.mobileNum);
    this.setOrderZone(consumerParams.orderZone);
  }

  setOrderZone(orderZone: string): void {
    this.orderZone = orderZone;
  }

  getOrderZone(): string {
    return this.orderZone;
  }

}

export { Consumer };
