import sys
from flask import Flask, request
from flask_cors import CORS,cross_origin


import disease_prediction as m

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(app, supports_credentials=True)
CORS(app)


@app.route('/',methods=['GET'])
def home():
    args = request.args
    x = m.NaiveBayesWithProps(args["s1"],args["s2"],args["s3"],args["s4"],args["s5"])    
    return {"disease" : x}

@app.route('/flask', methods=['GET'])
def index():
    return "flask running"
if __name__=='__main__':
    app.run(host="0.0.0.0",debug=True)