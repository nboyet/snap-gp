import os

from flask import send_from_directory

from wrapper import is_filled, file_exists
from models import topology as _topology, switch as _switch, hosts as _hosts
import json
from app import app

PATH_TOPO = "PATH_TOPOLOGY"
PATH_SWITCH = "PATH_SWITCH"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@is_filled(PATH_TOPO)
@file_exists(PATH_TOPO)
@app.route('/topology', methods=["GET"])
def topology():
    """
    Return a JSON for topology
    """
    return json.dumps(_topology())


@is_filled(PATH_TOPO)
@file_exists(PATH_TOPO)
@app.route('/hosts', methods=["GET"])
def hosts():
    """
    Give the list of all hosts and their containers
    """
    return json.dumps(_hosts())


@is_filled(PATH_SWITCH)
@file_exists(PATH_SWITCH)
@app.route('/switch/<poller>/<host>', methods=["POST"])
def switch(poller: str, host: str):
    """
    Change the host for poller.
    :param poller: str
    :param host: str
    :return: str - error code. 0 for success
    """
    return json.dumps(_switch(poller, host))
