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
    Edit24 as Edit,
    UserActivity24 as UserActivity,
} from "@carbon/icons-react";

import { Fragment, useContext, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Auth";

const headers = [
    {
        key: "name",
        header: "Nombre",
    },
    {
        key: "id",
        header: "Correo",
    },
    {
        key: "last_update",
        header: "Última Actualización",
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
        key: "active",
        header: "Actividad",
    },
    {
        key: "has_credit",
        header: "Tiene Crédito",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancelar',
    'carbon.table.batch.items.selected': 'clientes seleccionados',
    'carbon.table.batch.item.selected': 'cliente seleccionado'
};

const ClientInfoTable = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});
    const [itemBegin, setItemBegin] = useState(0);
    const [itemEnd, setItemEnd] = useState(10);
    let history = useHistory();
    const { currentUser } = useContext(AuthContext);
 
    const handleBatchActionClickUpdateStatus = (selectedRows) => {
        const token = sessionStorage.getItem("token");
        const id = selectedRows[0].cells[1].value;
        const isActive = selectedRows[0].cells[11].value === "Activo";

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({ active: !isActive }),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Actividad modificada",
                });
                setShowNotification(true);
            }
            else {
                throw data.detail;
            }
        })
        .catch(error => {
            console.log(error);
            setNotificationInfo({
                kind: "error",
                title: error,
            });
            setShowNotification(true);
        });
    }

    const handleBatchActionClickUpdateAddress = selectedRows => {
        const id = selectedRows[0].cells[1].value;

        const location = {
            pathname: `/clientes/actualizar/${id}`,
            state: { 
                client: { 
                    curp: selectedRows[0].cells[3].value, 
                    address: selectedRows[0].cells[7].value, 
                    neighborhood: selectedRows[0].cells[8].value, 
                    city: selectedRows[0].cells[9].value, 
                    state: selectedRows[0].cells[10].value 
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
                            Recargar
                        </NotificationActionButton>
                    }
                >
                </InlineNotification>

                :

                <></>
            }
            <DataTable
                isSortable
                rows={props.clients.slice(itemBegin, itemEnd)}
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
                            title="Clientes Registrados"
                            description="Selecciona un cliente para modificar su estado de actividad o domicilio."
                            {...getTableContainerProps()}>
                            <TableToolbar {...getToolbarProps()}>
                                <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                                    <TableBatchAction
                                        renderIcon={UserActivity}
                                        iconDescription="Cambiar Estado de Actividad"
                                        onClick={() => { handleBatchActionClickUpdateStatus(selectedRows) }}>
                                        Cambiar Estado de Actividad
                                    </TableBatchAction>
                                    <TableBatchAction
                                        renderIcon={Edit}
                                        iconDescription="Editar Domicilio"
                                        onClick={() => { handleBatchActionClickUpdateAddress(selectedRows) }}>
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
                            <Pagination
                                backwardText="Anterior"
                                forwardText="Siguiente"
                                itemsPerPageText="Clientes por página:"
                                page={1}
                                pageNumberText="Página"
                                pageSize={10}
                                pageSizes={[
                                    10,
                                    25,
                                    50,
                                ]}
                                onChange={handlePageChange}
                                totalItems={props.clients.length}
                            />
                        </TableContainer>
                        <br /><br /><br />
                    </>
                )}
            />
        </>
    );

}

export default ClientInfoTable;