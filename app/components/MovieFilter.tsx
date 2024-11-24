"use client";

import React, { useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import { debounce } from "lodash";
import MovieList from './MovieList';

export default function MovieFilter() {
  const { movies, updateMovies } = useMovieContext();

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("http://127.0.0.1:8000/api/v1/movies");
      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }
      return res.json();
    }

    fetchMovies().then(updateMovies);
  }, [updateMovies]);

  const handleSearch = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const req = await fetch(`http://127.0.0.1:8000/api/v1/movies/search?query=${evt.target.value}&limit=10`);
    const movies = await req.json();
    updateMovies(movies);
  };

  return (
    <div className="mt-5 text-center">
      <h1 className="text-2xl font-bold">Movie Search</h1>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={debounce(handleSearch, 500)}
        className="border px-4 py-2 rounded text-black"
      />
      <MovieList movies={movies} />
    </div>
  );
}
