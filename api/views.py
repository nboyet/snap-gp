from app import app
import models as models
import json
from flask_cors import cross_origin


@app.route('/topology', methods=["GET"])
@cross_origin()
def topology():
    """
    Return a JSON for topology
    """
    return json.dumps(models.topology())


@app.route('/switch/<poller>/<host>')
def switch(poller, host):
    """
    Change the host for poller.
    :param poller: str
    :param host: str
    :return: int - error code. 0 for success
    """
    switch = models.switch(poller, host)
    return json.dumps(switch)
