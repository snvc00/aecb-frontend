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
        header: "Name",
    },
    {
        key: "id",
        header: "Email",
    },
    {
        key: "last_update",
        header: "Last Update",
    },
    {
        key: "curp",
        header: "CURP",
    },
    {
        key: "birthdate",
        header: "Birthdate",
    },
    {
        key: "rfc",
        header: "RFC",
    },
    {
        key: "income",
        header: "Monthly Income",
    },
    {
        key: "address",
        header: "Street and Number",
    },
    {
        key: "neighborhood",
        header: "Neighborhood",
    },
    {
        key: "city",
        header: "City",
    },
    {
        key: "state",
        header: "State",
    },
    {
        key: "active",
        header: "Active",
    },
    {
        key: "has_credit",
        header: "Has Credit",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancel',
    'carbon.table.batch.items.selected': 'clients selected',
    'carbon.table.batch.item.selected': 'client selected'
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
        const isActive = selectedRows[0].cells[11].value === "Active";

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
                    title: "Activity status has been updated",
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
                title: String(error),
            });
            setShowNotification(true);
        });
    }

    const handleBatchActionClickUpdateAddress = selectedRows => {
        const id = selectedRows[0].cells[1].value;

        const location = {
            pathname: `/clients/update/${id}`,
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
                            Reload
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
                            title="Registered Clients"
                            description="Select a client to update address or activity status."
                            {...getTableContainerProps()}>
                            <TableToolbar {...getToolbarProps()}>
                                <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                                    <TableBatchAction
                                        renderIcon={UserActivity}
                                        iconDescription="Update Activity Status"
                                        onClick={() => { handleBatchActionClickUpdateStatus(selectedRows) }}>
                                        Update Activity Status
                                    </TableBatchAction>
                                    <TableBatchAction
                                        renderIcon={Edit}
                                        iconDescription="Update Address"
                                        onClick={() => { handleBatchActionClickUpdateAddress(selectedRows) }}>
                                        Update Address
                                    </TableBatchAction>
                                </TableBatchActions>
                                <TableToolbarContent>
                                    <TableToolbarSearch onChange={onInputChange} placeholder="Search client" />
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
                                backwardText="Backward"
                                forwardText="Forward"
                                itemsPerPageText="Clients per page:"
                                page={1}
                                pageNumberText="Page"
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