import { User } from './User';

class Courier extends User {

  private vehicleType: string;
  private preferredZone: string;

  constructor() {
    super();
  }

  setVehicleType(vehicleType: string): void {
    this.vehicleType = vehicleType;
  }

  setPreferredZone(preferredZone: string): void {
    this.preferredZone = preferredZone;
  }

  getVehicleType(): string {
    return this.vehicleType;
  }

  getPreferredZone(): string {
    return this.preferredZone;
  }

}

export { Courier };
