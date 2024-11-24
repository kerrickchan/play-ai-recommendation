.PHONY: install merge_movie_data start

all: install merge_movie_data start

start:
	uvicorn server:app --reload

install:
	pip install -r requirements.txt

merge_movie_data:
	python ai_model/merge_movie_data.py
