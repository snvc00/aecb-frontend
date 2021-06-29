import {
    DataTable,
    TableContainer,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    Table,
    TableBody,
    TableCell,
    InlineNotification,
    Pagination,
    Button,
    OverflowMenu,
    OverflowMenuItem,
} from "carbon-components-react";
import {
    Report24 as Report,
    Misuse24 as Misuse,
} from "@carbon/icons-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth";

const headers = [
    {
        key: "id",
        header: "ID",
    },
    {
        key: "creation_timestamp",
        header: "Created",
    },
    {
        key: "approved",
        header: "Approved",
    },
    {
        key: "active",
        header: "Active",
    },
    {
        key: "credit_card_id",
        header: "Credit Card ID",
    },
    {
        key: "credit_card_name",
        header: "Credit Card Name",
    },
    {
        key: "credit_card_range",
        header: "Credit Range",
    },
    {
        key: "client_name",
        header: "Client Name",
    },
    {
        key: "client_email",
        header: "Client Email",
    },
    {
        key: "reviewed_by",
        header: "Reviewed By",
    },
];

const PreapprovalRequestsTable = (props) => {
    const [itemBegin, setItemBegin] = useState(0);
    const [itemEnd, setItemEnd] = useState(10);
    const [notificationInfo, setNotificationInfo] = useState();
    const [showNotification, setShowNotification] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleApproveRequest = (row) => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/preapprovals/${row.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ approved: true, reviewed_by: currentUser.email })
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (responseOk) {
                    setNotificationInfo({
                        kind: "success",
                        title: "Request Approved",
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

    const handleDenyRequest = (row) => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/preapprovals/${row.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ approved: false, active: false, reviewed_by: currentUser.email })
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (responseOk) {
                    setNotificationInfo({
                        kind: "success",
                        title: "Request Denied",
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

    const handleGenerateReport = () => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/preapprovals/generate_report/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token"),
                "Admin-Email": currentUser.email,
            }
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (responseOk) {
                    setNotificationInfo({
                        kind: "success",
                        title: "Report Generated",
                    });
                    setShowNotification(true);
                    window.open(`${process.env.REACT_APP_BACKEND_API}${data.report}`, "_blank");
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
                >
                </InlineNotification>

                :

                <></>
            }
            <DataTable
                isSortable
                rows={props.preapprovals.slice(itemBegin, itemEnd)}
                headers={headers}
                {...props}
                render={({
                    rows,
                    headers,
                    getHeaderProps,
                    getToolbarProps,
                    getRowProps,
                    onInputChange,
                    getTableProps,
                    getTableContainerProps,
                }) => (
                    <>
                        <TableContainer
                            title="Preapproval Requests"
                            description="Select a preapproval request to approve, deny or generate report."
                            {...getTableContainerProps()}>
                            <TableToolbar {...getToolbarProps()}>
                                <TableToolbarContent>
                                    <TableToolbarSearch onChange={onInputChange} placeholder="Search preapproval request" />
                                    <Button
                                        renderIcon={Report}
                                        onClick={handleGenerateReport}
                                        kind="primary"
                                    >
                                        Generate Report
                                    </Button>
                                </TableToolbarContent>
                            </TableToolbar>
                            <Table {...getTableProps()}>
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header, i) => (
                                            <TableHeader key={i} {...getHeaderProps({ header })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                        <TableExpandHeader />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id} {...getRowProps({ row })}>
                                            {row.cells.map((cell) => (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            ))}
                                            <TableCell className="bx--table-column-menu">
                                                <OverflowMenu>
                                                    <OverflowMenuItem hasDivider disabled={row.cells[2].value === "Yes" || row.cells[3].value === "No"} itemText="Approve Request" onClick={() => { handleApproveRequest(row) }} />
                                                    <OverflowMenuItem hasDivider disabled={row.cells[2].value === "No" || row.cells[3].value === "No"} isDelete itemText="Deny Request" onClick={() => { handleDenyRequest(row) }} />
                                                </OverflowMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                backwardText="Backward"
                                forwardText="Forward"
                                itemsPerPageText="Preapproval requests per page:"
                                page={1}
                                pageNumberText="Page"
                                pageSize={10}
                                pageSizes={[
                                    10,
                                    25,
                                    50,
                                ]}
                                onChange={handlePageChange}
                                totalItems={props.preapprovals.length}
                            />
                        </TableContainer>
                        <br /><br /><br />
                    </>
                )}
            />
        </>

    );
}

export default PreapprovalRequestsTable;