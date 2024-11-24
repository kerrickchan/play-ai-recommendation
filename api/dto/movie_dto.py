from pydantic import BaseModel


class MovieSearchRequest(BaseModel):
    query: str
    limit: int = 10


class MovieRecommendationRequest(BaseModel):
    user_id: int = 1
    limit: int = 10
