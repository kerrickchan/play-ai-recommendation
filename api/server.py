from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from router.root_route import router as root_router
from router.v1.movie_route import router as movie_router

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Allows all origins
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Add the router to the app
app.include_router(root_router)
app.include_router(movie_router, prefix="/api/v1")

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
