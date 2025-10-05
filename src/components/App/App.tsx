import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies, type MovieResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";

import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);
      // ustawiamy stan strony - ale do fetch używamy bezpośrednio literału 1,
      // żeby nie polegać na asynchronicznej aktualizacji stanu
      setPage(1);

      // UWAGA: fetchMovies oczekuje najpierw page: number, potem search: string
      const response: MovieResponse = await fetchMovies(1, query);

      // bezpieczeństwo: upewnijmy się, że results to tablica
      const results = Array.isArray((response as any).results)
        ? (response as any).results
        : [];

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results as Movie[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading && <Loader />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelected} />
        )}
      </main>

      {selected && <MovieModal movie={selected} onClose={closeModal} />}

      <Toaster position="top-right" />
    </>
  );
}
