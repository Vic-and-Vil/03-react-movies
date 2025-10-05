import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types/movie';

const BASE_URL = 'https://example.com/api/movies'; // <-- twój backend
const token = import.meta.env.VITE_MOVIE_TOKEN;    // <-- dynamiczny token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface MovieResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Movie[];
}

export const fetchMovies = async (
  page: number,
  perPage: number,
  search?: string
): Promise<MovieResponse> => {
  const response: AxiosResponse<MovieResponse> = await api.get('', {
    params: { page, perPage, search },
  });
  return response.data;
};
