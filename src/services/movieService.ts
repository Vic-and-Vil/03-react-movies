import axios from "axios";

// ===== Інтерфейси =====
export interface Movie {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// ===== API базові налаштування =====
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Отримує список фільмів з TMDB API за пошуковим запитом.
 * @param query - Пошуковий запит (рядок)
 * @param page - Номер сторінки (за замовчуванням 1)
 * @returns Promise<MovieResponse>
 */
export async function fetchMovies(
  query: string,
  page = 1
): Promise<MovieResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

  if (!token) {
    throw new Error(
      "❌ VITE_TMDB_TOKEN не знайдено. Додай його до .env (VITE_TMDB_TOKEN=...)"
    );
  }

  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      page,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
