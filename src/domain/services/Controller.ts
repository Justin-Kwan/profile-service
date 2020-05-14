

class Controller {

  createEntity(req: Request, res: Response) {
    const response: string = entityService.create(req.);
    res.status(response.code).send(response.body);
  }

  updateEntity(req: Request, res: Response) {
    const response: string = entityService.update(req.);
    res.status(response.code).send(response.body);
  }

  getEntity(req: Request, res: Response) {
    const response: string = entityService.get(req.);
    res.status(response.code).send(response.body);
  }

  



}
