import React, { useEffect, useState } from "react";
import Host from "./container/Host";
import { useAsync } from "react-async-hook";
import { getHosts } from "../services";
import BarLoader from "react-spinners/BarLoader";

const fetchHosts = async () => getHosts();

/**
 * Displaying all the hosts and their containers.
 * Call to API in order to get all the hosts
 */
export default function Manage() {
  const asyncHosts: any = useAsync(fetchHosts, []);
  const [refresh, setRefresh] = useState(false);
  const groupName = "switchGroup";

  // Refresh the hosts when refresh is set to true
  useEffect(() => {
    const fetching = () => asyncHosts.execute() && setRefresh(false);
    if (refresh) {
      fetching();
    }
  }, [refresh, asyncHosts]);
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {asyncHosts.loading && <BarLoader />}
        {asyncHosts.error && <span>{asyncHosts.error.toString()}</span>}
        {asyncHosts.result &&
          Object.keys(asyncHosts.result.data).map((key: string) => {
            return (
              <div className="p-4 xl:w-1/4 md:w-1/2 w-full" key={key}>
                <Host
                  groupName={groupName}
                  host={key}
                  containers={asyncHosts.result.data[key]}
                  setRefresh={setRefresh}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
