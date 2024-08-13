import requests, os, json, time

class Coordinator:
    def __init__(self) -> None:
        self.API_URL = 'https://geocode.maps.co/search?q=address&api_key=apikey'

    def get_coordinates(self, locations, mongoclient):
        
        result = []
        
        for location in locations:
            if "Coordinates" not in location:
                try:
                    time.sleep(0.2)
                    resp = requests.get(self.API_URL.replace("apikey", os.getenv("GEOAPI_KEY")).replace('address', location["Locations"] + " San Francisco"))
                    data =  json.loads(resp.text)
                
                    if len(data) == 0:
                        print("Coordinates not found for ", location["Locations"])
                        continue
                    
                    location["Coordinates"] = data[0]["lat"] + "," + data[0]["lon"]                
                    result.append(location)
                    
                    #UPDATE MONGO DB WITH COORDINATES
                    mongoclient.update({"Title": location["Title"]}, location["Coordinates"])
                except Exception as e:
                    print("Error", e)
                    print(location, "\n\n")
                    
                
                
                
        
        return result
    