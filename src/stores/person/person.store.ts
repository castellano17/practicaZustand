import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStore } from "../Storages/session-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

//! type PersonStore = PersonState & Actions;

const storeAPI: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
});

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeAPI, {
    name: "person-store",
    storage: customSessionStore,
  })
);
