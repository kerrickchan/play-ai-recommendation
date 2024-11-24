"use client";

import React from "react";
import { useMovieContext } from "../context/MovieContext";

export default function MovieFilter() {
  const { filterMovies } = useMovieContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterMovies(e.target.value);
  };

  return (
    <div className="mt-5 text-center">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleSearch}
        className="border px-4 py-2 rounded text-black"
      />
    </div>
  );
}
