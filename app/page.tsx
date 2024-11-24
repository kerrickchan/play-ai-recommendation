import React from "react";
import MovieList from "./components/MovieList";
import MovieFilter from "./components/MovieFilter";

async function fetchMovies() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await res.json();
  return data.slice(0, 10); // Limit to 10 movies
}

export default async function HomePage() {
  const movies = await fetchMovies();

  return (
    <main>
      <h1 className="text-4xl font-bold mt-10 text-center">
        Movies (Static Site Generated)
      </h1>
      <MovieFilter />
      <MovieList movies={movies} />
    </main>
  );
}