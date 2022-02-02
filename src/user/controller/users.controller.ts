// we import express to add types to the request/response objects from our controller functions
import express from "express";

// we import our newly created user services
import UserService from "../service/users.service";

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await UserService.list();
    return res.status(200).json(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    const user = await UserService.create(req.body);
    return res.status(201).json(user);
  }

  async removeUser(req: express.Request, res: express.Response) {
    await UserService.deleteById(req.params.username);
    return res
      .status(200)
      .json({ message: "You deleted the user successfully" });
  }
}

export default new UsersController();
