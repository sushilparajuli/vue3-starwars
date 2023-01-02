import type { IFilm } from "@/services/swapi";
import { defineStore } from "pinia";

interface FilmState {
  films: IFilm[];
  totalRecord: number;
  page: string;
}

interface FilmsResponse {
  results: IFilm[];
  total: number;
}

export const useFilms = defineStore("films", {
  state: (): FilmState => ({
    films: [],
    totalRecord: 0,
    page: "1",
  }),
  actions: {
    async fetchFilmsByQuery(query?: string, page: number = 1) {
      if (query && query.length > 0) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}films/?search=${query}&page=${page}`
        );
        const { total, results } =
          (await res.json()) as unknown as FilmsResponse;
        this.films = results;
        this.totalRecord = total as number;
      } else {
        this.films = [];
      }
    },
    async fetchFilms(page: number = 1) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}films/?page=${page}}`
      );
      const { total, results } = (await res.json()) as unknown as FilmsResponse;
      this.films = results;
      this.totalRecord = total as number;
    },
  },
  getters: {
    topFilms: (state): IFilm[] => state.films.slice(0, 3),
  },
});
