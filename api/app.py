from flask import Flask

from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)

if __name__ == '__main__':
    app.run()

import views
