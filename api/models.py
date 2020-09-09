import config
import subprocess


def run_script(script, *args):
    """
    Run the script in parameters.
    :param script: script path
    :param *args: arguments for the script
    :return: Dictionnary with "complete" and "error" keys as, respectively, a CompletedProcess and an str.
    error is None or empty if nothing went wrong.
    """
    res = {"complete": None}
    try:
        res["complete"] = subprocess.run(["sh", script + ' '.join(str(arg) for arg in args)], capture_output=True)
        res["error"] = res["complete"].stderr
    except Exception as e:
        res["error"] = e
    finally:
        return res


def topology():
    """
    Run the topology script and made a JSON of the response
    :return: list of list of str
    """
    res = run_script(config.PATH_TOPOLOGY)
    if res["error"]:
        return res
    # Format file
    all_lines = res["complete"].decode("utf-8")
    all_lines = all_lines.splitlines()
    splitted_lines = []
    for line in all_lines:
        splitted_lines.append(line.split(';'))

    return splitted_lines





