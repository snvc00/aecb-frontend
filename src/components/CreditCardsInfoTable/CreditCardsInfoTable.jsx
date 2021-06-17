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
    InlineNotification,
    NotificationActionButton,
    Pagination,
} from "carbon-components-react";

import {
    Purchase24 as Purchase,
    Image24 as Image,
} from "@carbon/icons-react";

import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

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
        key: "min_credit",
        header: "Crédito Mínimo",
    },
    {
        key: "max_credit",
        header: "Crédito Máximo",
    },
    {
        key: "cat",
        header: "CAT Promedio",
    },
    {
        key: "annual_fee",
        header: "Costo de Anualidad",
    },
    {
        key: "tier",
        header: "Categoría",
    },
    {
        key: "image",
        header: "Imagen",
    },
    {
        key: "last_update",
        header: "Última Actualización",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'tarjetas seleccionadas',
    'carbon.table.batch.item.selected': 'tarjeta seleccionada'
};

const CreditCardsInfoTable = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});
    const [itemBegin, setItemBegin] = useState(0);
    const [itemEnd, setItemEnd] = useState(10);
    let history = useHistory();

    const currencyToNumber = (currency) => {
        const ammount = String(currency).split(" ")[0];

        return parseInt(ammount.substr(1));
    }

    const handleBatchActionClickUpdateCreditCard = (selectedRows) => {
        const id = selectedRows[0].cells[0].value;
        console.log(selectedRows[0].cells);

        const location = {
            pathname: `/tarjetas/actualizar/${id}`,
            state: {
                creditCard: {
                    name: selectedRows[0].cells[1].value,
                    min_credit: currencyToNumber(selectedRows[0].cells[2].value),
                    max_credit: currencyToNumber(selectedRows[0].cells[3].value),
                    cat: parseInt(String(selectedRows[0].cells[4].value).substr(0, selectedRows[0].cells[4].value.length - 1)),
                    annual_fee: currencyToNumber(selectedRows[0].cells[5].value),
                }
            }
        }

        history.push(location);
    }

    const handleBatchActionClickOpenImage = (selectedRows) => {
        const url = selectedRows[0].cells[7].value;
        window.open(url, "_blank");
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
        <>
            {showNotification ?
                <InlineNotification
                    kind={notificationInfo.kind || "error"}
                    title={notificationInfo.title || ""}
                    style={{ marginBottom: "2rem" }}
                    actions={
                        <NotificationActionButton
                            onClick={() => { window.location.reload() }}
                        >
                            Intentar de nuevo
                        </NotificationActionButton>
                    }
                >
                </InlineNotification>

                :

                <></>
            }
            <DataTable
                isSortable
                rows={props.cards.slice(itemBegin, itemEnd)}
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
                    <TableContainer
                        title="Tarjetas de Crédito Registradas"
                        description="Selecciona una tarjeta para modificar categoría o imagen."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={Purchase}
                                    iconDescription="Actualizar Tarjeta de Crédito"
                                    onClick={() => { handleBatchActionClickUpdateCreditCard(selectedRows) }}>
                                    Actualizar Tarjeta de Crédito
                                </TableBatchAction>
                                <TableBatchAction
                                    renderIcon={Image}
                                    iconDescription="Abrir Imagen"
                                    onClick={() => { handleBatchActionClickOpenImage(selectedRows) }}>
                                    Abrir Imagen
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
                        <Pagination
                            backwardText="Anterior"
                            forwardText="Siguiente"
                            itemsPerPageText="Tarjetas por página:"
                            page={1}
                            pageNumberText="Página"
                            pageSize={10}
                            pageSizes={[
                                10,
                                25,
                                50,
                            ]}
                            onChange={handlePageChange}
                            totalItems={props.cards.length}
                        />
                    </TableContainer>
                )}
            />
        </>
    );

}

export default CreditCardsInfoTable;