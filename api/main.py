from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from surprise import SVD, Dataset, Reader

app = FastAPI()

# Load preprocessed data
data = pd.read_csv("merged_data.csv")
movies = pd.read_csv("movies.csv")

# Train a Collaborative Filtering Model
reader = Reader(rating_scale=(0.5, 5.0))
ratings_data = Dataset.load_from_df(data[["userId", "movieId", "rating"]], reader)
trainset = ratings_data.build_full_trainset()

model = SVD()
model.fit(trainset)


# Pydantic model for requests
class RecommendationRequest(BaseModel):
    user_id: int = 1


@app.get("/")
def root():
    return {"message": "Welcome to the Movie Recommendation API!"}


@app.get("/movies")
def get_movies():
    """
    Get a random list of movies.
    """
    random_movies = movies.sample(n=10)
    return random_movies.to_dict(orient="records")

@app.post("/movies/recommend")
def recommend_movies(request: RecommendationRequest, n: int = 5):
    """
    Recommend top N movies for a given user.
    """
    user_id = request.user_id

    # Get all movie IDs
    all_movies = set(movies["movieId"])
    rated_movies = set(data[data["userId"] == user_id]["movieId"])
    unrated_movies = list(all_movies - rated_movies)

    # Predict ratings for unrated movies
    predictions = [
        (movie_id, model.predict(user_id, movie_id).est)
        for movie_id in unrated_movies
    ]

    # Sort movies by predicted rating
    top_movies = sorted(predictions, key=lambda x: x[1], reverse=True)[:n]

    # Fetch movie titles
    recommended_movies = [
        {"movieId": movie[0], "title": movies[movies["movieId"] == movie[0]]["title"].values[0]}
        for movie in top_movies
    ]

    return {"user_id": user_id, "recommendations": recommended_movies}


@app.get("/movies/{movie_id}")
def get_movie_details(movie_id: int):
    """
    Get details of a movie by its ID.
    """
    movie = movies[movies["movieId"] == movie_id]
    if movie.empty:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie.iloc[0].to_dict()


@app.get("/movies/search")
def search_movies(query: str, limit: int = 10):
    """
    Search for movies by title.
    """
    filtered_movies = movies[movies["title"].str.contains(query, case=False, na=False)]
    return filtered_movies.head(limit).to_dict(orient="records")
