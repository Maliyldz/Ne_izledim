import { createContext, useContext, type ReactNode } from "react";
import type { Movie, MovieFormData } from "../interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { seedMovies } from "../utils/seedData";
import { STORAGE_KEY } from "../utils/constants";

interface MovieContextType {
  movies: Movie[];
  addMovie: (data: MovieFormData) => void;
  updateMovie: (id: string, data: MovieFormData) => void;
  deleteMovie: (id: string) => void;
  getMovieById: (id: string) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useLocalStorage<Movie[]>(STORAGE_KEY, seedMovies);

  // CREATE
  const addMovie = (data: MovieFormData) => {
    const newMovie: Movie = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setMovies((prev) => [newMovie, ...prev]);
  };

  // UPDATE
  const updateMovie = (id: string, data: MovieFormData) => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...data } : movie))
    );
  };

  // DELETE
  const deleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  // READ
  const getMovieById = (id: string) => movies.find((movie) => movie.id === id);

  return (
    <MovieContext.Provider
      value={{ movies, addMovie, updateMovie, deleteMovie, getMovieById }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies yalnızca MovieProvider içinde kullanılabilir.");
  }
  return context;
}