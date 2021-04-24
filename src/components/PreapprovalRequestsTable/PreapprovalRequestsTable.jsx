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
    Report24 as Report,
    Misuse24 as Misuse,
} from "@carbon/icons-react";

import { requests as rows } from "../../assets/json/requests.json";

import { Component, Fragment } from "react";

const headers = [
    {
        key: "id",
        header: "Folio",
    },
    {
        key: "creationDate",
        header: "Fecha de Creación",
    },
    {
        key: "state",
        header: "Estado",
    },
    {
        key: "activity",
        header: "Actividad",
    },
    {
        key: "creditCardId",
        header: "ID Tarjeta de Crédito",
    },
    {
        key: "creditCardName",
        header: "Tarjeta de Crédito",
    },
    {
        key: "clientId",
        header: "ID Cliente",
    },
    {
        key: "clientName",
        header: "Cliente",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'solicitudes seleccionadas',
    'carbon.table.batch.item.selected': 'solicitud seleccionada'
};

class PreapprovalRequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: rows,
            headers: headers,
        }
    }

    handleBatchActionClickUpdateActivity(selectedRows) {
        console.log("handleBatchActionClickUpdateActivity");
    }

    handleBatchActionClickGenerateReport(selectedRows) {
        console.log("handleBatchActionClickGenerateReport");
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
                        title="Solicitudes de Preaprobación"
                        description="Selecciona una solicitud para terminar o generar un reporte."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} translateWithId={this.customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={Misuse}
                                    iconDescription="Terminar Proceso de Solicitud"
                                    kind="danger--ghost"
                                    onClick={() => { this.handleBatchActionClickUpdateActivity(selectedRows) }}>
                                    Terminar Proceso de Solicitud
                                </TableBatchAction>
                                <TableBatchAction
                                    renderIcon={Report}
                                    iconDescription="Generar Reporte"
                                    onClick={() => { this.handleBatchActionClickGenerateReport(selectedRows) }}>
                                    Generar Reporte
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} placeholder="Buscar solicitud" />
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

export default PreapprovalRequestsTable;