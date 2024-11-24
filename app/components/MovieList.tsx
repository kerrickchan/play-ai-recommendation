"use client";

import { Movie } from "@/app/models/Movie";

export default function MovieList({ movies }: Readonly<{ movies: Movie[] }>) {
  return (
    <div className="mt-5 text-center">
      <ul className="list-disc">
        {movies.map((movie) => (
          <li key={movie.id} className="text-lg">
            {movie.title} ({movie.genres.map((genre) => '#' + genre.trim()).join(" ")})
          </li>
        ))}
      </ul>
    </div>
  );
}
