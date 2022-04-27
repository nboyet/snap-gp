from models import topology, switch
import json
from app import app


@app.route('/topology', methods=["GET"])
def topo():
    """
    Return a JSON for topology
    """
    return json.dumps(topology())


@app.route('/switch/<poller>/<host>', methods=["UPDATE"])
def switch(poller: str, host: str):
    """
    Change the host for poller.
    :param poller: str
    :param host: str
    :return: str - error code. 0 for success
    """
    _switch = switch(poller, host)
    return json.dumps(_switch)
