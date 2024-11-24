from fastapi import APIRouter, HTTPException

from controller.movie_controller import MovieController
from dto.movie_dto import MovieRecommendationRequest

router = APIRouter()
movie_controller = MovieController()


@router.get("/movies")
def get_movies(limit: int = 10):
    """
    Get a random list of movies.
    """
    return movie_controller.get_all_movies(limit)


@router.post("/movies/recommend")
def recommend_movies(request: MovieRecommendationRequest, n: int = 5):
    """
    Recommend top N movies for a given user.
    """
    return movie_controller.recommend_movies(request.user_id, n)


@router.get("/movies/search")
def search_movies(query: str, limit: int = 10):
    """
    Search for movies by title.
    """
    return movie_controller.search_movies(query, limit)


@router.get("/movies/{movie_id}")
def get_movie_details(movie_id: int):
    """
    Get details of a movie by its ID.
    """
    movie = movie_controller.get_movie_by_id(movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie.to_dict()
