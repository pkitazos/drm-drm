import json
import random
import requests

ggBaseUrl = "https://www.guitarguitar.co.uk/hackathon"
geocodingBaseUrl = "https://nominatim.openstreetmap.org/search"

orders = requests.get(f"{ggBaseUrl}/orders/").json()

latlongmap = {}

for order in orders:

    if order["ShippingAddress"]["city"] in latlongmap.keys():
        order["ShippingAddress"]["latitude"] = latlongmap[order["ShippingAddress"]["city"]][0]
        order["ShippingAddress"]["longitude"] = latlongmap[order["ShippingAddress"]["city"]][1]
    else:
        lat = random.uniform(25, 48)
        lon = random.uniform(-124, -67)
        latlongmap[order["ShippingAddress"]["city"]] = [lat, lon]
        order["ShippingAddress"]["latitude"] = lat
        order["ShippingAddress"]["longitude"] = lon

    

print(json.dumps(orders))