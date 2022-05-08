import React from "react";
import DataTable from "react-data-table-component";
import { getTopology } from "../services";
import { useAsync } from "react-async-hook";
import BarLoader from 'react-spinners/BarLoader';
import ErrorMessage from "./ErrorMessage";

const customStyles = {

  headCells: {
    style : {
      fontSize: "x-large",
    }
  },
  rows: {
    style: {
      fontSize: "large",
    }
  }
}
const columns = [
  {
    id: "name",
    name: "Container",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    id: "host",
    name: "Hôte",
    selector: (row: any) => row.host,
    sortable: true,
  },
  {
    id: "path",
    name: "Chemin",
    selector: (row: any) => row.path,
    sortable: true,
  },
  {
    id: "publicIp",
    name: "IP Publique",
    selector: (row: any) => row.publicIP,
    sortable: true,
  },
  {
    id: "interface",
    name: "Interface",
    selector: (row: any) => row.interface,
    sortable: true,
  },
  {
    id: "privateIP",
    name: "IP Privée",
    selector: (row: any) => row.privateIP,
    sortable: true,
  },
  {
    id: "poller",
    name: "Poller",
    selector: (row: any) => row.poller,
    sortable: true,
  },
  {
    id: "site",
    name: "Site",
    selector: (row: any) => row.site,
    sortable: true,
  },
];

const fetchTopology = async () => getTopology();

function Table() {
  const asyncTopology: any = useAsync(fetchTopology, []);

  return (
    <>
      {asyncTopology.loading && <BarLoader />}
      {asyncTopology.error && <ErrorMessage message={asyncTopology.error.message} />}
      {asyncTopology.result && asyncTopology.result.data && (
        <DataTable
          data={asyncTopology.result.data}
          columns={columns}
          customStyles={customStyles}
        />
      )}
    </>
  );
}

export default Table;
