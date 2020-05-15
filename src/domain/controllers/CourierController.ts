import { CourierService } from '../entity-services/CourierService';

class CourierController {

  private readonly courierService: CourierService =
    new CourierService();

  createCourier(req: Request, res: Response): void {
    const response: any = courierService.create(req.body);
    res.status(response.code).send(response.body);
  }

  updateCourier(req: Request, res: Response): void {
    const response: any = courierService.update(req.body);
    res.status(response.code).send(response.body);
  }

  getCourier(req: Request, res: Response): void {
    const response: any = courierService.get(req.body);
    res.status(response.code).send(response.body);
  }

  deleteCourier(req: Request, res: Response): void {
    const response: any = courierService.delete(req.body);
    res.status(response.code).send(response.body);
  }

}
