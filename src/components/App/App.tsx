import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies, type MovieResponse } from "../../services/movieService";

import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);
      
      const data: MovieResponse = await fetchMovies(query, 1);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // const handlePageChange = async (newPage: number, query: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const data: MovieResponse = await fetchMovies(query, newPage);

  //     setMovies(data.results);
  //     setPage(newPage);
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error("Unknown error"));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error.message} />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={setSelected} />
        )}

        {/* Пагінація (тільки якщо більше 1 сторінки)
        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1, "")}
                className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )} */}
      </main>

      {selected && <MovieModal movie={selected} onClose={closeModal} />}

      <Toaster position="top-right" />
    </>
  );
}
