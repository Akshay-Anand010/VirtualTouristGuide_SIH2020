import pandas as pd
import numpy as np
import re, math
from collections import Counter
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

app=Flask(__name__)

@app.route('/interest')
def lat():
    WORD = re.compile(r'\w+')

    # applying cosine similarity for finding similarities between user interests and places
    def get_cosine(vec1, vec2):
        intersection = set(vec1.keys()) & set(vec2.keys())
        numerator = sum([vec1[x] * vec2[x] for x in intersection])
        sum1 = sum([vec1[x] ** 2 for x in vec1.keys()])
        sum2 = sum([vec2[x] ** 2 for x in vec2.keys()])
        denominator = math.sqrt(sum1) * math.sqrt(sum2)
        if not denominator:
            return 0.0
        else:
            return float(numerator) / denominator

    def text_to_vector(text):
        words = WORD.findall(text)
        return Counter(words)

    # remove spaces from the category column of dataset
    def clean_data(x):
        if isinstance(x, list):
            return [(i.replace(" ", "")) for i in x]
        else:
            if isinstance(x, str):
                return (x.replace(" ", ""))
            else:
                return ''

    # calulating weighted rating of places

    metadata = pd.read_csv('Monuments.csv', low_memory=False)
    # print(metadata.head())
    print("Select your preferred category:\n1.wildlife \n2.heritage \n3.pilgirmage\n4.park\n5.museum")
    #text1 = input("Enter User Interests: ")  # user preference
    text1=""

    text1= request.args.get('text1')
    print("t1 is")
    print(text1)
    toprec=["Baga Beach","Aguada Fort","Dudhsagar Waterfalls","Calangute Beach","Basilica Of Bom Jesus","Shri Mangueshi Temple / Mangeshi Temple","Reis Mogos Fort","Anjuna Beach","Vagator Beach","Se Cathedral"]
    places = {}
    if(text1 == ""):
        for i in toprec:

            for row in metadata.itertuples():

                # print(li)
                if (i == (row.title).strip()):
                    places[i] = row.mid

        print(places)
        return jsonify(places)



    vector1 = text_to_vector(text1)
    C = metadata['p_rating'].mean()
    m = metadata['count'].quantile(0.75)

    def weighted_rating(x, m=m, C=C):
        v = x['count']
        R = x['p_rating']
        # Calculation based on the Bayesian Rating Formula
        return (v / (v + m) * R) + (m / (m + v) * C)

    metadata['category'] = metadata['category'].apply(clean_data)
    metadata['score'] = metadata.apply(weighted_rating, axis=1)
    # print(metadata.head())
    cos = []
    for i in list(metadata['category']):
        # print(type(i))
        text2 = i
        vector2 = text_to_vector(text2)
        cosine = get_cosine(vector1, vector2)
        cos.append(cosine)
    metadata['cosine'] = cos
    x = metadata['cosine'] > 0.0
    rec = pd.DataFrame(metadata[x])

    # df.sort_values(["b", "c"], ascending = (False, True))
    rec = rec.sort_values('cosine', ascending=False)
    # rec=rec.sort_values('score',ascending=False)
    print(rec)
    print(vector1)
    # src=input("Enter your location: ")
    dest = list(rec['title'])
    print(dest)
    pr={}
    for s in dest:
        for row in metadata.itertuples():

            # print(li)
            if (s.strip() == (row.title).strip()):

                pr[s] = row.mid
    print(pr)
    return jsonify(pr)
    # print(type(dest))
if __name__ == "__main__":
    app.run()
#http://127.0.0.1:5000/interest?text1="Beach,Fort,Fort"
#For empty string http://127.0.0.1:5000/interest?text1=