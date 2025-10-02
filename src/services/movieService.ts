
import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string, page: number): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      page,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWJlODc5NDNjZjdlOTRlYjM4OWVmMWUxODA3ZDk3OSIsIm5iZiI6MTc1OTI1MTI1MC44NjksInN1YiI6IjY4ZGMwYjMyNTViN2I0MDYxZmM3NzFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hqLNr-NwPUKeGervSCeqojeGsmakmq-3C0AC1j74AqI`,
    },
  });

  return data;
}
