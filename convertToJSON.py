import csv
import json

arr = []
with open('NN.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in reader:
      x = {
         'imp1': row[13][11:-1],
         'imp2': row[27][11:-1],
         'lat': row[41][8:],
         'lon': row[42][8:],
         'sog': row[43][8:],
      }
      arr.append(x)
    
    json_object = json.dumps(arr)
    with open("NN.json", "w") as outfile:
      outfile.write(json_object)