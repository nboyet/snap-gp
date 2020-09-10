from app import app
import models as models
import json


@app.route('/topology', methods=["GET"])
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
