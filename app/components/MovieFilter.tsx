"use client";

import React from "react";
import { useMovieContext } from "../context/MovieContext";
import { debounce } from "lodash";
export default function MovieFilter() {
  const { updateMovies } = useMovieContext();

  const handleSearch = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const req = await fetch(`http://127.0.0.1:8000/api/v1/movies/search?query=${evt.target.value}&limit=10`);
    const movies = await req.json();
    updateMovies(movies);
  };

  return (
    <div className="mt-5 text-center">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={debounce(handleSearch, 500)}
        className="border px-4 py-2 rounded text-black"
      />
    </div>
  );
}
