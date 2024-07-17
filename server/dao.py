import os

from pymongo import MongoClient , ASCENDING

class MAPDao():
    def __init__(self) -> None:
        print("port", os.getenv("MONGO_PORT"))
        self.client = MongoClient(
                            os.getenv("MONGO_SERVER")
                            , port=int(os.getenv("MONGO_PORT"))
                            , username=os.getenv("MONGO_USER")
                            , password=os.getenv("MONGO_PASS")
                            ) 


    def query(self, filter, limit = 10):
        db = self.client["sanfrancisco"]    
        col = db["film_locations"]
        result = col.find(filter,{"Title": 1,"Locations":1,  "_id":0}, limit=limit).sort('Title', ASCENDING)
        # l = list(result)
        return list(result)