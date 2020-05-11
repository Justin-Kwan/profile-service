import { User } from './User';

class Courier extends User {

  private vehicleType: string;
  private preferredZone: string;
  private inviteCode: string;

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

  // allows for field hiding
  toClientJson(): string {
    return JSON.stringify({
      id: this.getId(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      email: this.getEmail(),
      country: this.getCountry(),
      locationId: this.getLocationId(),
      mobileNum: this.getMobileNum(),
      vehicleType: this.getVehicleType(),
      preferredZone: this.getPreferredZone(),
      inviteCode: this.getInviteCode()
    });
  }

}

export { Courier };
