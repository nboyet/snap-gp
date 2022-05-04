import React from "react";
import Host from "./container/Host";
import { useAsync } from "react-async-hook";
import { getHosts } from "../services";
import BarLoader from "react-spinners/BarLoader";

const fetchHosts = async () => getHosts();

export default function Manage() {
  const asyncHosts: any = useAsync(fetchHosts, []);
  const groupName = "switchGroup";

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
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
