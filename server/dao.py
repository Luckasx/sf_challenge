import os

from pymongo import MongoClient, ASCENDING


class MAPDao():
    def __init__(self) -> None:
        print("port", os.getenv("MONGO_PORT"))
        self.client = MongoClient(
            os.getenv("MONGO_SERVER"), port=int(os.getenv("MONGO_PORT")), username=os.getenv("MONGO_USER"), password=os.getenv("MONGO_PASS")
        )
        
    def find(self, filter):
        db = self.client["sanfrancisco"]
        col = db["film_locations"]
        result = col.find(filter,{"Title": 1,"Locations":1, "Coordinates": 1,  "_id":0}).sort('Title', ASCENDING)
        # l = list(result)
        return list(result)
        

    def aggregate(self, filter, limit=10):
        db = self.client["sanfrancisco"]
        col = db["film_locations"]

        pipeline = [{"$match": filter},
                    {"$limit": 10},
                    { "$sort": { "Title": 1 } },
                    {"$project": {"Title": 1, "_id": 0}}]

        result = col.aggregate(pipeline)

        return list(result)
    
       
