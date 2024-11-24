import React from "react";
import MovieFilter from "./components/MovieFilter";
import MovieRecommendation from './components/MovieRecommendation';

export default async function HomePage() {
  return (
    <main>
      <h1 className="text-4xl font-bold mt-10 text-center">
        Movies AI Recommendation
      </h1>
      <MovieFilter />
      <MovieRecommendation />
    </main>
  );
}