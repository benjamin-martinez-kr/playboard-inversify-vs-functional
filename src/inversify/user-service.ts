import type { ILogger, IUserService } from "./types";
import type { User } from "../types";

import { inject, injectable } from "inversify";

import "reflect-metadata";
import { TYPES } from "./inversify-types";

@injectable()
class UserService implements IUserService {
  private logger: ILogger;

  constructor(@inject(TYPES.Logger) logger: ILogger) {
    this.logger = logger;
  }

  async getUser(id: number): Promise<User> {
    this.logger.log(`Fetching user with id ${id}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate API call
    return Promise.resolve({ id, name: "John Doe" });
  }
}

export {
  UserService
}