import type { User } from "../types";

interface ILogger {
  log: (message: string) => void;
}

interface IUserService {
  getUser: (id: number) => Promise<User>;
}

export type {
  ILogger,
  IUserService,
}