import express from "express";
import * as http from "http";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRouteConfig } from "./common/common.routes.config";
import { UserRoutes } from "./user/users.route.config";
import debug from "debug";
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 9000;
const routes: Array<CommonRouteConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// Initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// Here I am adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UserRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRouteConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  // My only exception to avoiding console.log(), because I
  // always want to know when the server is done starting up
  console.log(runningMessage);
});
