import React from "react";
import Host from "./container/Host";
import { DraggableItemType } from "../constants";

export default function Manage() {
  const test: Array<{
    host: string;
    containers: Array<DraggableItemType>;
  }> = [
    {
      host: "host_1",
      containers: [
        { id: 1, name: "container_1" },
        { id: 2, name: "container_2" },
      ],
    },
    {
      host: "host_2",
      containers: [
        {
          id: 3,
          name: "container_3",
        },
        { id: 4, name: "container_4" },
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {test.map((value) => {
          return (
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <Host
                groupName={"switchGroup"}
                host={value.host}
                containers={value.containers}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
