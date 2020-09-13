import React from 'react';
import MUIDataTable from "mui-datatables";

const title = "Topology";

const columns = [
    {
        name: "name",
        label: "Container",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "host",
        label: "Hôte",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "path",
        label: "Chemin",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "publicIp",
        label: "IP Publique",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "interface",
        label: "Interface",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "privateIP",
        label: "IP Privée",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "poller",
        label: "Poller",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "site",
        label: "Site",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const options = {
    filterType: 'checkbox',
};

class Table extends React.Component {

    state = {
        page: 0,
        count: 25,
        data: [],
        isLoading: false,
    }

    dataTopology = () => {
        this.setState({isLoading: true});
        fetch("/topology").then(res => res.json()).then( (res) => {
            this.setState({data: res, isLoading: false});
            }
        ).catch((error) => console.log(error));
    };

    componentDidMount() {
        this.dataTopology();
    }

    render () {
        return (
            <MUIDataTable
                title={title}
                data={this.state.data}
                columns={columns}
                options={options}
            />
        )
    }
}

export default Table;
