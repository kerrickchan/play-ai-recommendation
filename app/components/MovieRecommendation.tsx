"use client";

import { useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import MovieList from './MovieList';
import { useUserContext } from '../context/UserContext';


export default function MovieRecommendation() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { userId, updateUserId } = useUserContext();

  useEffect(() => {
    const fetchMovies = async (userId: number) => {
      const res = await fetch('http://127.0.0.1:8000/api/v1/movies/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await res.json();
      const movies = data.recommendations;
      setMovies(movies);
    }

    fetchMovies(userId);
  }, [userId]);

  return (
    <div className="mx-auto mt-5 text-center">
      <h1 className="text-2xl font-bold">Movie Recommendations for user {userId}</h1>
      <input type="number" value={userId} onChange={(evt) => updateUserId(Number.parseInt(evt.target.value))} />
      <MovieList movies={movies} />
    </div>
  )
}
