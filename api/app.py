from flask import Flask
from flask_cors import CORS
from config import DevConfig

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config.from_object(DevConfig)

import views
