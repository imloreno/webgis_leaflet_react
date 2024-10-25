import { create } from "zustand";
import axios from "axios";
import { Theme } from "../constants";

interface Geometry {
  type: string;
  coordinates: number[][][] | number[][];
}

interface Layer {
  id: number;
  name: string;
  area?: number;
  geometry: Geometry;
}

interface LayerStore {
  states: Layer[];
  theme: Theme;
  capitals: Layer[];
  disabledIds: { [key: string]: number[] };
  loading: boolean;
  error: string | null;
  fetchStates: () => Promise<void>;
  fetchCapitals: () => Promise<void>;
  addState: (newLayer: Layer) => void;
  addCapital: (newLayer: Layer) => void;
  toggleLayer: (layer: string, id: number) => void;
  setTheme: (theme: Theme) => void;
}

const useLayerStore = create<LayerStore>()((set, get) => ({
  states: [],
  theme: Theme.dark,
  disabledIds: { states: [], capitals: [] },
  capitals: [],
  loading: false,
  error: null,

  // Fetch states from GeoDjango API
  fetchStates: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:7777/api/v1/states/");
      const states = response.data.map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        area: feature.area,
        geometry: feature.geometry,
      }));
      set({ states, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch capitals from GeoDjango API
  fetchCapitals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/capitals/"
      );
      const capitals = response.data.map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        location: feature.location,
      }));
      set({ capitals, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new state layer dynamically
  addState: (newLayer) => {
    set((state) => ({ states: [...state.states, newLayer] }));
  },

  // Add a new capital layer dynamically
  addCapital: (newLayer) => {
    set((state) => ({ capitals: [...state.capitals, newLayer] }));
  },

  // Enable or disable a layer by id
  toggleLayer: (layer: string, id: number) => {
    const targetLayer = get().disabledIds[layer];
    const layerFiltered = targetLayer.includes(id)
      ? targetLayer.filter((layerId) => layerId !== id)
      : [...targetLayer, id];
    set((state) => ({
      disabledIds: { ...state.disabledIds, [layer]: layerFiltered },
    }));
  },
  setTheme: (theme: Theme) => set({ theme }),
}));

export default useLayerStore;

// Usage example in a React component
// import useLayerStore from './path/to/store';
// const { states, capitals, fetchStates, fetchCapitals, addState, addCapital } = useLayerStore();
// useEffect(() => { fetchStates(); fetchCapitals(); }, []);
