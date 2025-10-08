import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string, page: number): Promise<MovieResponse> {
  const response = await axios.get<MovieResponse>(API_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
}
