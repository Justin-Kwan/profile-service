import {
  Request,
  Response
} from 'express';

import { UserService } from '../user-services/UserService';

abstract class UserController {

  private readonly userService: any;

  constructor(userService: any) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const response: {
      body: {
        error: {
          message: string,
          code: number
        }
      },
      code: number
    } = await this.userService.createUser(req.params.id, req.body);
    res.status(response.code).send(response.body);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const response: {
      body: {
        error: {
          message: string,
          code: number
        }
      },
      code: number
    } = await this.userService.updateUser(req.params.id, req.body);
    res.status(response.code).send(response.body);
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const response: {
      body: {
        error: {
          message: string,
          code: number
        }
      },
      code: number
    } = await this.userService.getUser(req.params.id);
    res.status(response.code).send(response.body);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const response: {
      body: {
        error: {
          message: string,
          code: number
        }
      },
      code: number
    } = await this.userService.deleteUser(req.params.id);
    res.status(response.code).send(response.body);
  }

}

export { UserController };
