import type {  User } from "../types";

import { create } from "zustand";

import { getUser } from "./user-service";

interface StoreState {
  busy: boolean;
  user: User | null;
  error: { message: string } | null;
  fetch: (id: number) => Promise<void>
};

const useStore = create<StoreState>((set) => ({
  busy: false,
  user: null,
  error: null,
  fetch: async (id: number) => {
    set((state) => ({
      ...state,
      busy: true,
      error: null,
      user: null,
    }))

    try {
      const user: User = await getUser(id);

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
  useStore
}