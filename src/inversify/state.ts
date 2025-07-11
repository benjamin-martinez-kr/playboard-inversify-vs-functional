import { create } from "zustand";
import type { IUserService } from "./types";
import type { User } from "../types";

interface StoreState {
  busy: boolean;
  user: User | null;
  error: { message: string } | null;
  fetch: (id: number, userService: IUserService) => Promise<void>
};

const useInversifyStore = create<StoreState>((set) => ({
  busy: false,
  user: null,
  error: null,
  // TODO: How to use UserService here without coupling state to inversify?
  // This is not a common pattern in react state management tools, but we can use it for demonstration.
  fetch: async (id: number, userService: IUserService) => {
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