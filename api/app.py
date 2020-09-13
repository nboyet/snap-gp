from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-type'

if __name__ == '__main__':
    app.run()

import views
