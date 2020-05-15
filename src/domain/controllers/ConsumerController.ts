import { ConsumerService } from '../entity-services/ConsumerService';

class ConsumerController {

  private readonly consumerService: ConsumerService =
    new ConsumerService();

  createConsumer(req: Request, res: Response): void {
    const response: any = consumerService.create(req.body);
    res.status(response.code).send(response.body);
  }

  updateConsumer(req: Request, res: Response): void {
    const response: any = consumerService.update(req.body);
    res.status(response.code).send(response.body);
  }

  getConsumer(req: Request, res: Response): void {
    const response: any = consumerService.get(req.body);
    res.status(response.code).send(response.body);
  }

  deleteConsumer(req: Request, res: Response): void {
    const response: any = consumerService.delete(req.body);
    res.status(response.code).send(response.body);
  }

}
