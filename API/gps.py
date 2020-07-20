import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import re
import string
import math
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

app=Flask(__name__)

@app.route('/gps')
def lat():
    # Assign colum names to the dataset
    names = ['latitude', 'longitude']

    # Read dataset to pandas dataframe
    dataset = pd.read_csv('Monuments.csv')
    print(dataset.head())

    lati = request.args.get('lati',type=float)
    longi = request.args.get('longi',type=float)
    # data_lat=dataset.loc[dataset.latitude==15.5494]

    # data_place=data_lat.loc[data_lat.longitude==73.7535]

    # print(data_place)
    diff = []
    case_list = {}
    for row in dataset.itertuples():

        print(row.latitude)
        print(math.cos(math.radians(lati)))
        dis = 6371 * math.acos(math.cos(math.radians(lati)) * math.cos(math.radians(row.latitude)) *
              math.cos(math.radians(row.longitude) - math.radians(longi)) + math.sin(math.radians(lati)) *
              math.sin(math.radians(row.latitude)))

        if (dis < 10):
            print(row.title)
            print(dis)
            case = {row.title: dis}
            case_list.update(case)
    print(case_list)

    sort_orders = sorted(case_list.items(), key=lambda x: x[1])

    print(sort_orders)
    for i in sort_orders:
        diff.append(i[0])
    print(diff)

    pr = {}
    for i in diff:
        for row in dataset.itertuples():

            # print(li)
            if (i.strip() == (row.title).strip()):

                pr[i] = row.mid

        print(pr)
    return jsonify(pr)

if __name__ == "__main__":
    app.run()

#http://127.0.0.1:5000/gps?lati=15.444&longi=74