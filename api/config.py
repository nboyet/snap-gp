import os


class Config:
    PATH_TOPOLOGY = os.environ.get('PATH_TOPOLOGY', None)
    PATH_SWITCH = os.environ.get('PATH_SWITCH', None)
    TOPOLOGY_HEADERS = ["name", "host", "path", "publicIP", "interface", "privateIP", "poller", "site"]
    # CORS_HEADERS = "Content-type"


class DevConfig(Config):
    DEBUG = True
    FLASK_ENV = "development"
