from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str
    genres: list[str] = []
    rating: float = 0.0

    def to_dict(self):
        return self.model_dump()
