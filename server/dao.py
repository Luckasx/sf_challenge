import os

from pymongo import MongoClient , ASCENDING

print("port", os.getenv("MONGO_PORT"))
client = MongoClient(
                    os.getenv("MONGO_SERVER")
                     , port=int(os.getenv("MONGO_PORT"))
                     , username=os.getenv("MONGO_USER")
                     , password=os.getenv("MONGO_PASS")
                     ) 


def query(filter, limit = 10):
    db = client["sanfrancisco"]    
    col = db["film_locations"]
    result = col.find(filter,{"Title": 1,"Locations":1,  "_id":0}, limit=limit).sort('Title', ASCENDING)
    # l = list(result)
    return list(result)