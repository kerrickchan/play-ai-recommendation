import React from "react";
import MovieList from "./components/MovieList";
import MovieFilter from "./components/MovieFilter";

async function fetchMovies() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/movies");
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
}

export default async function HomePage() {
  const movies = await fetchMovies();

  return (
    <main>
      <h1 className="text-4xl font-bold mt-10 text-center">
        Movies AI Recommendation
      </h1>
      <MovieFilter />
      <MovieList movies={movies} />
    </main>
  );
}