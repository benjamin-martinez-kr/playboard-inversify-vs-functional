import type { IUserService } from "./types";
import type { User } from "../types";

import { create } from "zustand";

import { container } from "./inversify";
import { TYPES } from "./inversify-types";

interface StoreState {
  busy: boolean;
  user: User | null;
  error: { message: string } | null;
  fetch: (id: number) => Promise<void>
};

const useInversifyStore = create<StoreState>((set) => ({
  busy: false,
  user: null,
  error: null,
  fetch: async (id: number) => {
    // This breaks the separation of concerns, but is necessary to use Inversify with Zustand.
    const userService = container.get<IUserService>(TYPES.UserService);

    set((state) => ({
      ...state,
      busy: true,
      error: null,
      user: null,
    }))

    try {
      const user: User = await userService.getUser(id);

      set((state) => ({
        ...state,
        user,
      }))
    } catch (error) {
      set((state) => ({
        ...state,
        error: {
          message: (error as Error).message ?? "Failed to fetch user"
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        busy: false,
      }));
    }
  }
}));


export {
  useInversifyStore
}