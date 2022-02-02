import express from "express";
import { CommonRouteConfig } from "../common/common.routes.config";
import UsersMiddleware from "./middlewares/users.middleware";
import UsersController from "./controller/users.controller";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";

export class UserRoutes extends CommonRouteConfig {
  constructor(app: express.Application) {
    super(app, "UserRoute");
  }

  configureRoutes() {
    this.app
      .route("/api/users")
      .get(UsersController.listUsers)
      .post(
        body("first_name").isString(),
        body("username").isString(),
        body("date_of_birth").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameUsernameDoesntExist,
        UsersController.createUser
      );

    this.app
      .route("/api/users/:username")
      .delete(UsersMiddleware.checkUserExist, UsersController.removeUser);
    return this.app;
  }
}
