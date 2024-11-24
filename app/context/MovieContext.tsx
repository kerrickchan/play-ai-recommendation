'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Movie } from '@/app/models/Movie';

type MovieContextType = {
  movies: Movie[];
  updateMovies: (movies: Movie[]) => void;
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

  const updateMovies = useCallback((newMovies: Movie[]) => {
    setMovies(newMovies);
  }, []);

  const contextValue = useMemo(
    () => ({ movies: movies, updateMovies }),
    [movies, updateMovies]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
