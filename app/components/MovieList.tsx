"use client";

import React, { useEffect } from "react";
import { useMovieContext } from "@/app/context/MovieContext";
import { Movie } from "@/app/models/Movie";

export default function MovieList({ movies }: Readonly<{ movies: Movie[] }>) {
  const { movies: storedMovies, updateMovies } = useMovieContext();

  // Hydrate context with movies when the component mounts
  useEffect(() => {
    updateMovies(movies);
  }, [movies, updateMovies]);

  return (
    <div className="mt-5 text-center">
      <ul className="list-disc">
        {storedMovies.map((movie) => (
          <li key={movie.id} className="text-lg">
            {movie.title} ({movie.genres.map((genre) => '#' + genre.trim()).join(" ")})
          </li>
        ))}
      </ul>
    </div>
  );
}
