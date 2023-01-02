import type { IVehicle } from "@/services/swapi";
import { defineStore } from "pinia";

interface VehiclResponse {
  results: IVehicle[];
  total: number;
}

interface VehiclState {
  vehicles: IVehicle[];
  totalRecord: number;
  page: number;
}

export const useVehicles = defineStore("vehicles", {
  state: (): VehiclState => ({
    vehicles: [],
    totalRecord: 0,
    page: 1,
  }),
  actions: {
    async fetchVehicleByQuery(query?: string, page: number = 1) {
      if (query && query.length > 0) {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }vehicles/?search=${query}&page=${page}`
        );
        const { total, results } =
          (await res.json()) as unknown as VehiclResponse;
        this.vehicles = results;
        this.totalRecord = total as number;
      } else {
        this.vehicles = [];
      }
    },
    async fetchVehicle(page: number = 1) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}vehicles/?page=${page}}`
      );
      const { total, results } =
        (await res.json()) as unknown as VehiclResponse;
      this.vehicles = results;
      this.totalRecord = total as number;
    },
  },
  getters: {
    topVehicles: (state): IVehicle[] => state.vehicles.slice(0, 3),
  },
});
