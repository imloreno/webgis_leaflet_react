import { create } from "zustand";

export const useStore = create((set) => ({
  layers: [],
  addLayer: (layer: any) =>
    set((state: any) => ({ layers: [...state.layers, layer] })),
  setLayers: (layers: any) => set({ layers }),
}));
