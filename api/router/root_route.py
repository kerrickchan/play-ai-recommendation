from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_root():
    return {"message": "Welcome to the Movie Recommendation API!"}
