from repository.movie_repository import MovieRepository
from ai_model.movie_ai_model import MovieAiRecommenderModel

class MovieController:
    def __init__(self):
        self.movie_repository = MovieRepository()
        self.ai_model = MovieAiRecommenderModel(self.movie_repository.data_frame)

    def get_all_movies(self, limit: int = 10):
        return self.movie_repository.get_all_movies(limit)

    def recommend_movies(self, user_id: int, n: int = 5):
        # Get all movies from the repository
        all_movies = self.movie_repository.get_movies_data_frame().to_dict(orient="records")

        # Predict ratings for all movies
        predictions = [
            (movie, self.ai_model.predict(user_id, movie["id"])) for movie in all_movies
        ]

        # Sort movies by predicted rating
        top_movies = sorted(predictions, key=lambda x: x[1], reverse=True)[:n]

        # Fetch movie titles
        recommended_movies = [
            movie[0] for movie in top_movies
        ]

        return {"user_id": user_id, "recommendations": recommended_movies}

    def search_movies(self, query: str, limit: int = 10):
        return self.movie_repository.search_movies(query, limit)

    def get_movie_by_id(self, movie_id: int):
        return self.movie_repository.get_movie_by_id(movie_id)
