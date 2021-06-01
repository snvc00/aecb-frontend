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
} from "carbon-components-react";

import {
    Purchase24 as Purchase,
} from "@carbon/icons-react";

import { Fragment, useState } from "react";

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
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'tarjetas seleccionadas',
    'carbon.table.batch.item.selected': 'tarjeta seleccionada'
};

const CreditCardsInfoTable = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const handleBatchActionClickUpdateCreditCard = (selectedRows) => {
        console.log("handleBatchActionClickUpdateCreditCard");
    }

    const customTranslationForTableBatchActions = (id, state) => {
        if (id === 'carbon.table.batch.cancel') {
            return translationKeys[id];
        }
        return `${state.totalSelected} ${translationKeys[id]}`;
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
            rows={props.cards}
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
        </>
    );

}

export default CreditCardsInfoTable;