import os

from contextlib import asynccontextmanager

from fastapi import FastAPI

from dotenv import load_dotenv

# take environment variables from .env.
# print("env file", os.path.abspath(os.path.dirname(__file__)) + "/.env")
load_dotenv(os.path.abspath(os.path.dirname(__file__)) + "/.env")

import server.dao as dao

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = dao
    print("Connected to the MongoDB database!")
    yield
    print("FastApi down")

app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/films/")
def get_films_by_year(title: str = ''):
    return {"items": app.mongodb_client.query({"Title": {'$regex': f".*{title}.*",  "$options": "i"}})}
