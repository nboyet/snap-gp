import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { DraggableItemType } from "../../constants";

export default function Host(props: {
  groupName: string;
  host: string;
  containers: Array<DraggableItemType>;
}) {
  const { host, containers, groupName } = props;
  const [containersList, setContainersList] = useState(containers ?? []);

  return (
    <>
      <div className="h-full w-full rounded-lg transition duration-300 border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h1 className="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none text-center">
          {host}
        </h1>

        {/* Obligatory because typescript error in last version of react-sortablejs */}
        {/* @ts-ignore */}
        <ReactSortable
          group={groupName}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          list={containersList}
          setList={setContainersList}
          className="w-min-full h-min-full"
        >
          {containersList.map((item) => (
            <div className="border-2 hover:bg-gray-700 item" key={item.id}>
              {item.name}
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
}
