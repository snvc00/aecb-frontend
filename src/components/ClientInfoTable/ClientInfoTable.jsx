import {
    DataTable,
    TableContainer,
    TableToolbar,
    TableBatchActions,
    TableBatchAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    Table,
    TableBody,
    TableCell,
    TableSelectRow,
} from "carbon-components-react";

import {
    Edit24 as Edit,
    UserActivity24 as UserActivity,
} from "@carbon/icons-react";

import { clients as rows } from "../../assets/json/clients.json";

import { Component, Fragment } from "react";

const headers = [
    {
        key: "id",
        header: "ID",
    },
    {
        key: "name",
        header: "Nombre",
    },
    {
        key: "curp",
        header: "CURP",
    },
    {
        key: "birthdate",
        header: "Fecha de Nacimiento",
    },
    {
        key: "rfc",
        header: "RFC",
    },
    {
        key: "income",
        header: "Ingreso Mensual",
    },
    {
        key: "address",
        header: "Calle y Número",
    },
    {
        key: "neighborhood",
        header: "Colonia",
    },
    {
        key: "city",
        header: "Ciudad",
    },
    {
        key: "state",
        header: "Estado",
    },
    {
        key: "status",
        header: "Actividad",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'clientes seleccionados',
    'carbon.table.batch.item.selected': 'cliente seleccionado'
};

class ClientInfoTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: rows,
            headers: headers,
        }
    }

    handleBatchActionClickUpdateStatus(selectedRows) {
        console.log("handleBatchActionClickUpdateStatus");
    }

    handleBatchActionClickUpdateAddress(selectedRows) {
        console.log("handleBatchActionClickUpdateAddress");
    }

    customTranslationForTableBatchActions(id, state) {
        if (id === 'carbon.table.batch.cancel') {
            return translationKeys[id];
        }
        return `${state.totalSelected} ${translationKeys[id]}`;
    }

    render() {
        return (
            <DataTable
                rows={this.state.rows}
                headers={this.state.headers}
                {...this.props}
                render={({
                    rows,
                    headers,
                    getHeaderProps,
                    getSelectionProps,
                    getToolbarProps,
                    getBatchActionProps,
                    getRowProps,
                    onInputChange,
                    selectedRows,
                    getTableProps,
                    getTableContainerProps,
                }) => (
                    <TableContainer
                        title="Clientes Registrados"
                        description="Selecciona un cliente para modificar su estado de actividad o domicilio."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} totalSelected={1} translateWithId={this.customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={UserActivity}
                                    iconDescription="Cambiar Estado de Actividad"
                                    onClick={() => { this.handleBatchActionClickUpdateStatus(selectedRows) }}>
                                    Cambiar Estado de Actividad
                                </TableBatchAction>
                                <TableBatchAction
                                    renderIcon={Edit}
                                    iconDescription="Editar Domicilio"
                                    onClick={() => { this.handleBatchActionClickUpdateAddress(selectedRows) }}>
                                    Editar Domicilio
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} placeholder="Buscar cliente" />
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableExpandHeader />
                                    {headers.map((header, i) => (
                                        <TableHeader key={i} {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Fragment key={row.id}>
                                        <TableRow {...getRowProps({ row })}>
                                            <TableSelectRow {...getSelectionProps({ row })} />
                                            {row.cells.map((cell) => (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            ))}
                                        </TableRow>
                                    </Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            />
        );
    }
}

export default ClientInfoTable;