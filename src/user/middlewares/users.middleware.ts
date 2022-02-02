import express from "express";
import UserService from "../service/users.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:user-middleware");

class UsersMiddleware {
  async validateSameUsernameDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserService.getUserByUsername(req.body.username);

    if (user) {
      res.status(400).send({ errors: ["User email already exists"] });
    } else {
      next();
    }
  }

  async checkUserExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UserService.getUserByUsername(req.params.username);

    if (!user) {
      res.status(400).send({ error: ["User does exists"] });
    } else {
      next();
    }
  }
}

export default new UsersMiddleware();
