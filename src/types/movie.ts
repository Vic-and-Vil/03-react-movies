export interface Movie {
  id: number;
  poster_path: string | null; // важливо дозволити null, бо TMDB може його повертати
  backdrop_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
