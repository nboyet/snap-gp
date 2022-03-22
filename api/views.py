from app import app
import models as models
import json


@app.route('/topology', methods=["GET"])
def topology():
    """
    Return a JSON for topology
    """
    return json.dumps(models.topology())


@app.route('/switch/<poller>/<host>', methods=["UPDATE"])
def switch(poller: str, host: str) -> str:
    """
    Change the host for poller.
    :param poller: str
    :param host: str
    :return: str - error code. 0 for success
    """
    _switch = models.switch(poller, host)
    return json.dumps(_switch)
