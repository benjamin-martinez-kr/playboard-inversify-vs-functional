import type { ILogger } from "./types";

import { injectable } from "inversify";

import "reflect-metadata";

@injectable()
class ConsoleLoggerService implements ILogger {
  log(message: string) {
    console.warn(message);
  }
}

export { ConsoleLoggerService };