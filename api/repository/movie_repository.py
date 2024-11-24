import pandas as pd

from entity.movie_entity import Movie


class MovieRepository:
    def __init__(self):
        # convert to dict
        self.data_frame = self.init_movies_rating_data_frame()
        self.movies_data_frame = self.init_movies_data_frame()

        # convert to Movie entity
        self.movies = [Movie(**movie) for movie in self.data_frame.to_dict(orient="records")]
    
    def init_movies_rating_data_frame(self):
        # read merged rating movie data
        data = pd.read_csv("./data/merged_data.csv")

        # drop columns
        data = data.drop(columns=["timestamp"])

        # calculate average rating
        data["rating"] = data.groupby("movieId")["rating"].transform("mean")

        # split genres
        data["genres"] = data["genres"].str.split("|")

        # rename columns
        data.rename(columns={"movieId": "id"}, inplace=True)

        return data
    
    def init_movies_data_frame(self):
        # read movies data
        data = pd.read_csv("./data/movies.csv")

        # split genres
        data["genres"] = data["genres"].str.split("|")

        # rename columns
        data.rename(columns={"movieId": "id"}, inplace=True)

        return data
  
    def get_movies_data_frame(self):
        if self.movies_data_frame is None:
            self.movies_data_frame = self.init_movies_data_frame()
        return self.movies_data_frame

    def get_data_frame(self):
        if self.data_frame is None:
            self.data_frame = self.init_movies_rating_data_frame()
        return self.data_frame


    def get_all_movies(self, limit: int = 10):
        return self.movies.sample(n=limit)

    def get_movie_by_id(self, movie_id: int):
        return next((movie for movie in self.movies if movie.id == movie_id), None)

    def search_movies(self, query: str, limit: int = 10):
        filtered_movies = [
            movie for movie in self.movies if query.lower() in movie.title.lower()]
        return filtered_movies[:limit]
