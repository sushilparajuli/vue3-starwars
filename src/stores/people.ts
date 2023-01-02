import type { IPeople } from "@/services/swapi";
import { defineStore } from "pinia";

interface PeopleResponse {
  results: IPeople[];
  count: number;
}

interface PeopleState {
  people: IPeople[];
  totalRecord: number;
  page: number;
  loading: boolean;
}

export const usePeople = defineStore("people", {
  state: (): PeopleState => ({
    people: [],
    totalRecord: 0,
    page: 1,
    loading: false,
  }),
  actions: {
    async fetchPeopleByQuery(query?: string, page: number = 1) {
      if (query && query.length > 0) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}people/?search=${query}&page=${page}`
        );
        const { count, results } =
          (await res.json()) as unknown as PeopleResponse;
        this.people = results;
        this.totalRecord = count as number;
      } else {
        this.people = [];
      }
    },
    async fetchPeople(page: number = 1) {
      this.loading = true;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}people/?page=${page}`
        );
        const { count, results } =
          (await res.json()) as unknown as PeopleResponse;
        this.people = results;
        this.totalRecord = count as number;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
  },
  getters: {
    topPeople: (state): IPeople[] => state.people.slice(0, 3),
  },
});
