import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { DraggableItemType } from "../../constants";
import { switchPoller } from "../../services";

export default function Host(props: {
  groupName: string;
  host: string;
  containers: Array<DraggableItemType>;
}) {
  const { host, containers, groupName } = props;
  const [showModal, setShowModal] = React.useState(false);
  const [containersList, setContainersList] = useState(containers ?? []);
  const [messageModal, setMessageModal] = useState(<></>);
  const [error, setError] = useState(false);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        message={messageModal}
        error={error}
      />
      <div className="h-full w-full rounded-lg transition duration-300 border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h1 className="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none text-center">
          {host}
        </h1>

        {/* Obligatory because typescript error in last version of react-sortablejs */}
        {/* @ts-ignore */}
        <ReactSortable
          group={groupName}
          animation={200}
          list={containersList}
          setList={setContainersList}
          className="w-min-full h-min-full"
          onEnd={(event) => {
            setError(false);
            switchPoller(event.item.textContent ?? "", event.to.id)
              .then((data: any) => {
                console.log(data);
                if (data["data"]["code"] !== 0) {
                  setError(true);
                  setMessageModal(<p>{`Code ${data["data"]["code"]}`}</p>);
                } else {
                  setMessageModal(
                    ModalMessage({
                      container: event.item.textContent,
                      lastHost: host,
                      newHost: event.to.id,
                    })
                  );
                }
              })
              .catch((error) => {
                setError(true);
                setMessageModal(<p>{error.toString()}</p>);
              })
              .finally(() => setShowModal(true));
          }}
          id={host}
          emptyInsertThreshold={15}
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

function Modal(props: {
  showModal: boolean;
  setShowModal: (set: boolean) => void;
  message: JSX.Element;
  error: boolean;
}) {
  const { showModal, setShowModal, message, error } = props;
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3
                    className={`text-3xl font-semibold ${
                      error ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {error ? "Erreur lors du changement" : "Bascule effectuée"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{message}</div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-blue-500 hover:text-white"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/*
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Save Changes
                  </button>
                  */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}

function ModalMessage(props: {
  container: string | null;
  lastHost: string;
  newHost: string;
}) {
  const { container, lastHost, newHost } = props;
  return (
    <p className="my-4 text-slate-500 text-lg leading-relaxed">
      Le container <b>{container}</b> passe de <b>{lastHost}</b> vers{" "}
      <b>{newHost}</b>
    </p>
  );
}
