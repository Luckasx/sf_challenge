import os

from pymongo import MongoClient 

client = MongoClient(
                    os.getenv("MONGO_SERVER")
                     , port=int(os.getenv("MONGO_PORT"))
                     , username=os.getenv("MONGO_USER")
                     , password=os.getenv("MONGO_PASS")
                     ) 


def query(filter):
    db = client["sanfrancisco"]
    col = db["film_locations"]
    result = col.find(filter,{"Title": 1, "_id":0})
    # l = list(result)
    return list(result)