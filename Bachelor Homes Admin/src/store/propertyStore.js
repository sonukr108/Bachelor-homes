import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../middleware/authIntercepter";


const usePropertyStore = create(
    persist(
        (set, get) => ({
            properties: [],
            ownerId: null,
            hasFetched: false,
            loading: false,
            error: null,

            fetchProperties: async (ownerId, force = false) => {
                const {
                    hasFetched,
                    ownerId: storedOwnerId,
                } = get();

                if (
                    !force &&
                    hasFetched &&
                    storedOwnerId === ownerId
                ) {
                    return;
                }

                try {
                    set({
                        loading: true,
                        error: null,
                    });

                    const response = await api.get(
                        `/properties/owner/${ownerId}`
                    );

                    const data = response.data;

                    if (!data.success) {
                        throw new Error(
                            data.message ||
                            "Failed to fetch properties"
                        );
                    }

                    set({
                        properties: data.properties || [],
                        ownerId,
                        hasFetched: true,
                        loading: false,
                        error: null,
                    });
                } catch (error) {
                    set({
                        loading: false,
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Failed to fetch properties",
                    });

                    throw error;
                }
            },

            addProperty: (property) =>
                set((state) => ({
                    properties: [
                        property,
                        ...state.properties,
                    ],
                })),

            updateProperty: (updatedProperty) =>
                set((state) => ({
                    properties: state.properties.map(
                        (property) =>
                            property.id === updatedProperty.id
                                ? updatedProperty
                                : property
                    ),
                })),

            removeProperty: (propertyId) =>
                set((state) => ({
                    properties: state.properties.filter(
                        (property) => property.id !== propertyId
                    ),
                })),

            clearProperties: () =>
                set({
                    properties: [],
                    ownerId: null,
                    hasFetched: false,
                    loading: false,
                    error: null,
                }),
        }),
        {
            name: "bachelor-homes-properties",
        }
    )
);

export default usePropertyStore;