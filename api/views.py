from app import app
import models
import json


@app.route('/topology', methods=["GET"])
def topology():
    """
    Return a JSON for topology
    """
    return json.dump(models.topology())
