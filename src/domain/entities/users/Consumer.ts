
import { User } from './User';

class Consumer extends User {

  private orderZone: string;

  constructor() {
    super();
  }

  setOrderZone(orderZone: string): void {
    this.orderZone = orderZone;
  }

  getOrderZone(): string {
    return this.orderZone;
  }

  toClientJson(): string {
    return JSON.stringify({
      id: this.getId(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      email: this.getEmail(),
      country: this.getCountry(),
      locationId: this.getLocationId(),
      mobileNum: this.getMobileNum(),
      orderZone: this.getOrderZone()
    });
  }

}

export { Consumer };
