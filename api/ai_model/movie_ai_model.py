import pandas as pd
from surprise import Dataset, Reader, SVD


class MovieAiRecommenderModel:
    def __init__(self, data: pd.DataFrame):
        self.model = self.train_model(data)

    def train_model(self, data: pd.DataFrame):
        # Load the data
        reader = Reader(rating_scale=(0.5, 5.0))
        ratings_data = Dataset.load_from_df(data[["userId", "id", "rating"]], reader)
        trainset = ratings_data.build_full_trainset()

        # Train the model
        model = SVD()
        model.fit(trainset)

        return model

    def predict(self, user_id: int, movie_id: int):
        return self.model.predict(user_id, movie_id).est
