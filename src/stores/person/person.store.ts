import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//import { customSessionStore } from "../Storages/session.storage";
import { firebaseStorage } from "../Storages/firebase.storage";

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
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeAPI, {
      name: "person-store",
      // storage: customSessionStore,
      storage: firebaseStorage,
    })
  )
);
