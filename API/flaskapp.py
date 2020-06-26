from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

import csv
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import re
import string
import pandas as pd

app=Flask(__name__)

@app.route('/latlong')
def lat():
    names = ['latitude', 'longitude']
    dataset = pd.read_csv('recommender_data.csv')
    print(dataset.head())
    lati=request.args.get('lati', type=float)
    longi=request.args.get('longi',type=float)
    print(lati)
    print(longi)
    data_lat = dataset.loc[dataset.latitude == lati]


    data_place = data_lat.loc[data_lat.longitude == longi]


    print(data_place)
    #print((data_place["Travel_tips"]).values[0])
    st = '1. Sinquerim Beach (3.3 Kms) can also be visited from this Fort.2. St. Lawrence Church at Candolim (1.4 kms) can also be visited from this Fort.3. Candolim Beach(5.5 kms) can also be visited from this Fort.'

    matchobj = re.findall(r'[.|,][a-zA-Z\s]+[(]', (data_place["Travel_tips"].values[0]))
    print(matchobj)
    matchobj = [''.join(c for c in s if c not in string.punctuation) for s in matchobj]

    print(matchobj)
    return jsonify(matchobj)
if __name__ == "__main__":
    app.run()




# http://127.0.0.1:5000/latlong?lati=15.5494&longi=73.7535