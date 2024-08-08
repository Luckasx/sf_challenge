import requests, os, json, time

class Coordinator:
    def __init__(self) -> None:
        self.API_URL = 'https://geocode.maps.co/search?q=address&api_key=apikey'

    def get_coordinates(self, locations):
        
        result = []
        
        for location in locations:
            if "Coordinates" not in location:
                print(location["Locations"])
                try:
                    time.sleep(0.2)
                    resp = requests.get(self.API_URL.replace("apikey", os.getenv("GEOAPI_KEY")).replace('address', location["Locations"] + " San Francisco"))
                    data =  json.loads(resp.text)
                
                    if len(data) == 0:
                        continue
                    
                    location["Coordinates"] = data[0]["lat"] + "," + data[0]["lon"]                
                    result.append(location)
                except Exception as e:
                    print(e)
                    print(location)
                    
                
                #TODO  UPDATE MONGO DB WITH COORDINATES
        
        return result
    