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
    Edit24 as Edit,
    UserActivity24 as UserActivity,
} from "@carbon/icons-react";

import { Fragment } from "react";
import { useState } from "react";

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
        key: "password",
        header: "Contraseña",
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
        key: "monthly_income",
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
        key: "is_active",
        header: "Actividad",
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

    const handleBatchActionClickUpdateStatus = async (selectedRows) => {
        console.log(selectedRows);
        console.log("handleBatchActionClickUpdateStatus");
        const token = sessionStorage.getItem("token") || "";
        const curp = selectedRows[0].cells[3].value;
        const isActive = selectedRows[0].cells[11].value === "Activo";


        await fetch(`http://localhost:5000/api/clients/${curp}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": token
            },
            body: JSON.stringify({ is_active: !isActive }),
        })
            .then(body => body.json())
            .then(data => {
                if (data.hasOwnProperty("error")) {
                    console.log(data.error);
                    setNotificationInfo({
                        kind: "error",
                        title: data.error.message,
                    });
                    setShowNotification(true);
                }
                else {
                    setNotificationInfo({
                        kind: "success",
                        title: "Actividad modificada",
                    });
                    setShowNotification(true);
                }
            })
            .catch(error => {
                console.log(error);
                setNotificationInfo({
                    kind: "error",
                    title: "Ha ocurrido un error",
                });
                setShowNotification(true);
            });
    }

    const handleBatchActionClickUpdateAddress = selectedRows => {
        console.log(selectedRows);
        console.log("handleBatchActionClickUpdateAddress");
        const curp = selectedRows[0].cells[3].value;

        window.location.replace(`/clientes/actualizar/${curp}`);
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
            rows={props.clients}
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
                    title="Clientes Registrados"
                    description="Selecciona un cliente para modificar su estado de actividad o domicilio."
                    {...getTableContainerProps()}>
                    <TableToolbar {...getToolbarProps()}>
                        <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                            <TableBatchAction
                                renderIcon={UserActivity}
                                iconDescription="Cambiar Estado de Actividad"
                                onClick={() => {handleBatchActionClickUpdateStatus(selectedRows)}}>
                                Cambiar Estado de Actividad
                            </TableBatchAction>
                            <TableBatchAction
                                renderIcon={Edit}
                                iconDescription="Editar Domicilio"
                                onClick={() => {handleBatchActionClickUpdateAddress(selectedRows)}}>
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
        </>
    );

}

export default ClientInfoTable;