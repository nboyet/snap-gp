import os.path

from app import app


def is_filled(name: str):
    """
    Check if the given name is filled
    """

    def wrap(f):
        defined = app.config.get(name, None)
        if not defined or not str(defined.strip()):
            raise AttributeError(f"Name {name} is not filled in config file")
        return f

    return wrap


def file_exists(name: str, config=True):
    """
    Check if the given file exists
    """

    def wrap(f):
        _name = app.config.get(name, None) if config else name
        if not os.path.exists(_name):
            raise AttributeError(f"File does not exists in {_name}")
        return f

    return wrap
