import pandas as pd

# Load datasets
ratings = pd.read_csv('./data/ratings.csv')
movies = pd.read_csv('./data/movies.csv')

# Merge datasets on movie_id
data = pd.merge(ratings, movies, on='movieId', how='inner', validate='m:1')

data.to_csv('./data/merged_data.csv', index=False)
