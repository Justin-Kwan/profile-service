"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res) {
        const response = await this.userService.createUser(req.params.id, req.body);
        res.status(response.code);
        res.send(response.body);
    }
    async updateUser(req, res) {
        const response = await this.userService.updateUser(req.params.id, req.body);
        res.status(response.code);
        res.send(response.body);
    }
    async getUser(req, res) {
        const response = await this.userService.getUser(req.params.id);
        res.status(response.code);
        res.send(response.body);
    }
    async deleteUser(req, res) {
        const response = await this.userService.deleteUser(req.params.id);
        res.status(response.code);
        res.send(response.body);
    }
}
exports.UserController = UserController;
