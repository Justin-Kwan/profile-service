

class Controller<T> {

  createEntity(req: Request, res: Response): void {
    const response: string = entityService.create(req.body);
    res.status(response.code).send(response.body);
  }

  updateEntity(req: Request, res: Response): void {
    const response: string = entityService.update(req.body);
    res.status(response.code).send(response.body);
  }

  getEntity(req: Request, res: Response): void {
    const response: string = entityService.get(req.body);
    res.status(response.code).send(response.body);
  }

  deleteEntity(): void {
    const response: string = entityService.delete(req.body);
    res.status(response.code).send(response.body);
  }

  
}
