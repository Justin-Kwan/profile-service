import { User } from './User';

class Courier extends User {

  private vehicleType:   string;
  private preferredZone: string;
  private inviteCode:    string;

  constructor() {
    super();
  }

  setVehicleType(vehicleType: string): void {
    this.vehicleType = vehicleType;
  }

  setPreferredZone(preferredZone: string): void {
    this.preferredZone = preferredZone;
  }

  setInviteCode(inviteCode: string): void {
    this.inviteCode = inviteCode;
  }

  getVehicleType(): string {
    return this.vehicleType;
  }

  getPreferredZone(): string {
    return this.preferredZone;
  }

  getInviteCode(): string {
    return this.inviteCode;
  }

}

export { Courier };
