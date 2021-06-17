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
    Pagination,
} from "carbon-components-react";

import {
    ManageProtection32 as ManageProtection,
} from "@carbon/icons-react";

import { Fragment, useState } from "react";
import { useHistory } from "react-router";

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
        key: "description",
        header: "Descripción",
    },
    {
        key: "max_protection",
        header: "Protección máxima",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'seguros seleccionados',
    'carbon.table.batch.item.selected': 'seguro seleccionado'
};

const InsurancesInfoTable = (props) => {
    const [itemBegin, setItemBegin] = useState(0);
    const [itemEnd, setItemEnd] = useState(10);
    let history = useHistory();

    const currencyToNumber = (currency) => {
        const ammount = String(currency).split(" ")[0];

        return parseInt(ammount.substr(1));
    }

    const handleBatchActionClickUpdateInsurance = (selectedRows) => {
        console.log(selectedRows);
        console.log("handleBatchActionClickUpdateInsurance");
        const id = selectedRows[0].cells[0].value;

        const location = {
            pathname: `/seguros/actualizar/${id}`,
            state: {
                insurance: {
                    name: selectedRows[0].cells[1].value,
                    description: selectedRows[0].cells[2].value,
                    max_protection: currencyToNumber(selectedRows[0].cells[3].value)
                }
            }
        }

        history.push(location);
    }

    const customTranslationForTableBatchActions = (id, state) => {
        if (id === 'carbon.table.batch.cancel') {
            return translationKeys[id];
        }
        return `${state.totalSelected} ${translationKeys[id]}`;
    }

    const handlePageChange = pagination => {
        setItemBegin(pagination.pageSize * (pagination.page - 1));
        setItemEnd(pagination.page * pagination.pageSize);
    }

    return (
        <DataTable
            isSortable
            rows={props.insurances.slice(itemBegin, itemEnd)}
            headers={headers}
            {...props}
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
                <>
                    <TableContainer
                        title="Seguros Registrados"
                        description="Selecciona un seguro para ver las opciones."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={ManageProtection}
                                    iconDescription="Actualizar Seguro"
                                    onClick={() => { handleBatchActionClickUpdateInsurance(selectedRows) }}>
                                    Actualizar Seguro
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} placeholder="Buscar seguro" />
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
                        <Pagination
                            backwardText="Anterior"
                            forwardText="Siguiente"
                            itemsPerPageText="Seguros por página:"
                            page={1}
                            pageNumberText="Página"
                            pageSize={10}
                            pageSizes={[
                                10,
                                25,
                                50,
                            ]}
                            onChange={handlePageChange}
                            totalItems={props.insurances.length}
                        />
                    </TableContainer>
                    <br /><br /><br />
                </>
            )}
        />
    );

}

export default InsurancesInfoTable;