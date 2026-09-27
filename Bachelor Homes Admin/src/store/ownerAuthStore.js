import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOwnerAuthStore = create(
    persist(
        (set) => ({
            owner: null,
            isAuthenticated: false,

            login: (owner) =>
                set({
                    owner,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    owner: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "bachelor-homes-owner",
        }
    )
);

export default useOwnerAuthStore;