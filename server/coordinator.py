import requests, os, json

class Coordinator:
    def __init__(self) -> None:
        self.API_URL = 'https://geocode.maps.co/search?q=address&api_key=apikey'

    def get_coordinates(self, address):
        resp = requests.get(self.API_URL.replace("apikey", os.getenv("GEOAPI_KEY")).replace('address', address))
        return json.loads(resp.text)[0]
    