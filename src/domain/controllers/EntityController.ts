

class EntityController<T> {

  createEntity(req: Request, res: Response): void {
    const response: any = entityService.create(req.body);
    res.status(response.code).send(response.body);
  }

  updateEntity(req: Request, res: Response): void {
    const response: any = entityService.update(req.body);
    res.status(response.code).send(response.body);
  }

  getEntity(req: Request, res: Response): void {
    const response: any = entityService.get(req.body);
    res.status(response.code).send(response.body);
  }

  deleteEntity(): void {
    const response: any = entityService.delete(req.body);
    res.status(response.code).send(response.body);
  }

}
