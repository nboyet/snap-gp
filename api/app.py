from flask import Flask
from flask_cors import CORS
from config import DevConfig

# TODO : Uncomment for prod
# app = Flask(__name__, static_folder='../build', static_url_path='/')

# TODO : Comment for dev
app = Flask(__name__)

CORS(app)
app.config.from_object(DevConfig)

import views
