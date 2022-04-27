from flask import Flask
from flask_cors import CORS
from config import DevConfig

app = Flask(__name__)
CORS(app)
app.config.from_object(DevConfig)

if __name__ == '__main__':
    app.run()

import views
