'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// Define the types
type Movie = {
  id: number;
  title: string;
};

type MovieContextType = {
  movies: Movie[];
  updateMovies: (movies: Movie[]) => void;
  filterMovies: (query: string) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Custom hook for accessing context
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

// Provider component
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const updateMovies = useCallback((newMovies: Movie[]) => {
    setMovies(newMovies);
    setFilteredMovies(newMovies);
  }, []);

  const filterMovies = useCallback((query: string) => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [movies]);

  const contextValue = useMemo(
    () => ({ movies: filteredMovies, updateMovies, filterMovies }),
    [filteredMovies, updateMovies, filterMovies]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
