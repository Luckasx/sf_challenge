import server.coordinator as coordinator
import server.dao as dao
import os

from contextlib import asynccontextmanager

from fastapi import FastAPI

from dotenv import load_dotenv

# take environment variables from .env.
# print("env file", os.path.abspath(os.path.dirname(__file__)) + "/.env")



@asynccontextmanager
async def lifespan(app: FastAPI):
    load_dotenv(os.path.abspath(os.path.dirname(__file__)) + "/.env")
    app.mongodb_client = dao.MAPDao()
    app.coordinator = coordinator.Coordinator()
    print("Connected to the MongoDB database!")
    yield
    print("FastApi down")

app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/films/")
def get_films_by_year(title: str = ''):
    return {"items": app.mongodb_client.aggregate({"$and":[{"Title": {'$regex': f".*{title}.*",  "$options": "i"}},{"Locations":{ "$exists": True}}]})}


@app.get("/coordinates/")
def get_movie_locations(movie: str = ''):
    movie_locations = app.mongodb_client.find({"$and":[{"Title": f"{movie}"},{"Locations":{ "$exists": True}}]})
    data = app.coordinator.get_coordinates(movie_locations)
    return { "items" : data}
