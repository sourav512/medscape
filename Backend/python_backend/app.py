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
    x = m.NaiveBayesWithProps(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
    return {"disease" : x}
    # response.headers.add("Access-Control-Allow-Origin", "*")
    # return args


if __name__=='__main__':
    app.run(host="0.0.0.0",debug=True)