
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

}

export { Consumer };
