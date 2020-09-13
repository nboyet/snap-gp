import config as config
import subprocess


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
    Run the topology script
    :return: list of list of str
    """
    res = run_script(config.PATH_TOPOLOGY)
    if "error" in res:
        return res

    headers = ["name", "host", "path", "publicIP", "interface", "privateIP", "poller", "site"]

    # Format file
    all_lines = res["complete"].stdout.decode("utf-8")
    all_lines = all_lines.splitlines()
    splitted_lines = []
    for line in all_lines:
        splitted_lines.append(line.split(';'))

    # Create array which contains for each line a header as key and its corresponding data
    data_array = []
    for row in range(len(splitted_lines)):
        data_array.append(dict(zip(headers, splitted_lines[row])))

    return data_array


def switch(poller, host):
    """
    Switch the poller poller to host
    :param poller: str
    :param host: str
    :return: int return code
    """
    res = run_script(config.PATH_SWITCH, poller, host)
    print(res)
    if "error" in res:
        return res
    return {"code": res["complete"].returncode}
