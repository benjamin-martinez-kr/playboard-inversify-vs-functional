import type { ILogger, IUserService } from "./types";

import { Container } from "inversify";

import "reflect-metadata";

import { UserService } from "./user-service";
import { ConsoleLoggerService } from "./console-logger-service";
import { TYPES } from "./inversify-types";

const registerBindings = (container: Container) => {
  container.bind<ILogger>(TYPES.Logger).to(ConsoleLoggerService);
  container.bind<IUserService>(TYPES.UserService).to(UserService);
}

export { registerBindings, UserService, ConsoleLoggerService };