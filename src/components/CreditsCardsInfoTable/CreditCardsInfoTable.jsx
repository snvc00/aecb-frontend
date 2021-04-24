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
    Purchase24 as Purchase,
} from "@carbon/icons-react";

import { creditCards as rows } from "../../assets/json/creditCards.json";

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
        key: "minCredit",
        header: "Crédito Mínimo",
    },
    {
        key: "maxCredit",
        header: "Crédito Máximo",
    },
    {
        key: "cat",
        header: "CAT Promedio",
    },
    {
        key: "annualFee",
        header: "Costo de Anualidad",
    },
    {
        key: "category",
        header: "Categoría",
    },
    {
        key: "image",
        header: "Imagen",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'tarjetas seleccionadas',
    'carbon.table.batch.item.selected': 'tarjeta seleccionada'
};

class CreditCardsInfoTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: rows,
            headers: headers,
        }
    }

    handleBatchActionClickUpdateCreditCard(selectedRows) {
        console.log("handleBatchActionClickUpdateCreditCard");
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
                        title="Tarjetas de Crédito Registradas"
                        description="Selecciona una tarjeta para modificar categoría o imagen."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} translateWithId={this.customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={Purchase}
                                    iconDescription="Actualizar Tarjeta de Crédito"
                                    onClick={() => { this.handleBatchActionClickUpdateCreditCard(selectedRows) }}>
                                    Actualizar Tarjeta de Crédito
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} placeholder="Buscar tarjeta" />
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

export default CreditCardsInfoTable;