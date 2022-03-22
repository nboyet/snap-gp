from flask import Flask

app = Flask(__name__)
app.config["CORS_HEADERS"] = 'Content-type'

if __name__ == '__main__':
    app.run()

import views
