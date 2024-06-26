import os

from pymongo import MongoClient 

client = MongoClient(
                    os.getenv("MONGO_SERVER")
                     , port=int(os.getenv("MONGO_PORT"))
                     , username=os.getenv("MONGO_USER")
                     , password=os.getenv("MONGO_PASS")
                     ) 


def query():
    db = client["sanfrancisco"]
    col = db["film_locations"]
    print("Counting documents..")
    print("oi:",col.count({}))