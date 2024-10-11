import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// const statesProcessor = (features: any[]) => {
//   const statesResponse = [];
//   for (let i = 0; i < features.length; i++) {
//     statesResponse.push({
//       id: features[i].id,
//       name: features[i].properties.name,
//       geometry: features[i].geometry,
//     });
//   }
// };

// Define the Zustand store to manage dynamic layers from GeoDjango
const useLayerStore = create(
  persist(
    (set, get) => ({
      layers: [],
      loading: false,
      error: null,

      fetchLayers: async () => {
        set({ loading: true, error: null });
        try {
          const states = await axios.get(
            "http://localhost:7777/api/v1/states/"
          );
          const capitals = await axios.get(
            "http://localhost:7777/api/v1/capitals/"
          ); // Example of another endpoint

          // Combine all features from multiple responses into a single array
          const combinedLayers = [
            ...states.data.map((feature: any) => ({
              id: feature.id,
              name: feature.name,
              geometry: feature.geometry,
            })),
            ...capitals.data.map((feature: any) => ({
              id: feature.id,
              name: feature.name,
              geometry: feature.geometry,
            })),
          ];

          set({ layers: combinedLayers, loading: false });
        } catch (error) {
          set({ error: error?.message, loading: false });
        }
      },

      // Add a new layer dynamically
      addLayer: (newLayer: any) => {
        set((state: any) => ({ layers: [...state.layers, newLayer] }));
      },

      // Remove a layer by ID
      removeLayer: (layerId: any) => {
        set((state: any) => ({
          layers: state.layers.filter((layer: any) => layer.id !== layerId),
        }));
      },

      // Update a specific layer
      updateLayer: (updatedLayer: any) => {
        set((state: any) => ({
          layers: state.layers.map((layer: any) =>
            layer.id === updatedLayer.id ? { ...layer, ...updatedLayer } : layer
          ),
        }));
      },
    }),
    {
      name: "layer-storage", // Key to store in local storage
    }
  )
);

export default useLayerStore;

// Usage example in a React component
// import useLayerStore from './path/to/store';
// const { layers, fetchLayers, addLayer, removeLayer, updateLayer } = useLayerStore();
// useEffect(() => { fetchLayers(); }, []);
