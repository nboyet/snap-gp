import subprocess
import csv
from app import app


def run_script(script, *args):
    """
    Run the script in parameters.
    :param script: script path
    :return: Dictionary with "complete" and "error" keys as, respectively, a CompletedProcess and an str.
    error is None or empty if nothing went wrong.
    """
    res = {"complete": None, "error": None}
    try:
        res["complete"] = subprocess.run([script, *args], capture_output=True, shell=True)
    except Exception as e:
        res["error"] = e
    finally:
        return res


def topology():
    """
    Read a CSV file which contains topology information
    :return: list of dict; each key/value corresponding to header/value.
    """
    data_array = []
    with open(app.config.get('PATH_TOPOLOGY'), newline='') as csv_file:
        values = csv.reader(csv_file, delimiter=';')
        for row in values:
            if len(row) == 0:
                continue
            zip_key_val = dict(zip(app.config.get("TOPOLOGY_HEADERS"), row[0].split(",")))
            data_array.append(zip_key_val)
    return data_array


def switch(poller, host):
    """
    Switch the poller to the given host
    :param poller: str
    :param host: str
    :return: int return code
    """
    res = run_script(app.config.get("PATH_SWITCH"), poller, host)
    return res if "error" in res else {"code": res["complete"].returncode}
