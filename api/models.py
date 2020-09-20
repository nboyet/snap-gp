import config as config
import subprocess
import csv


def run_script(script, *args):
    """
    Run the script in parameters.
    :param script: script path
    :return: Dictionnary with "complete" and "error" keys as, respectively, a CompletedProcess and an str.
    error is None or empty if nothing went wrong.
    """
    res = {"complete": None}
    try:
        res["complete"] = subprocess.run([script, *args], capture_output=True, shell=True)
    except Exception as e:
        res["error"] = e
    finally:
        return res


def topology():
    """
    Read a CSV file which contains topology informations
    :return: list of dict; each key/value corresponding to header/value.
    """
    headers = ["name", "host", "path", "publicIP", "interface", "privateIP", "poller", "site"]
    data_array = []
    with open(config.PATH_TOPOLOGY, newline='') as csv_file:
        values = csv.reader(csv_file, delimiter=';')
        for row in values:
            data_array.append(dict(zip(headers, row)))
    return data_array


def switch(poller, host):
    """
    Switch the poller poller to host
    :param poller: str
    :param host: str
    :return: int return code
    """
    res = run_script(config.PATH_SWITCH, poller, host)
    if "error" in res:
        return res
    return {"code": res["complete"].returncode}
