import {
    DataTable,
    TableContainer,
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    OverflowMenu,
    OverflowMenuItem,
    Pagination,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InlineNotification,
} from "carbon-components-react";

import { Image24 } from "@carbon/icons-react";
import { useContext, useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Auth";

const headers = [
    {
        key: "id",
        header: "ID",
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
        key: "creation_timestamp",
        header: "Creation Timestamp",
    },
    {
        key: "last_update",
        header: "Last Update",
    },
    {
        key: "credit_card_name",
        header: "Credit Card"
    },
    {
        key: "credit_card_max_credit",
        header: "Maximum Credit"
    },
    {
        key: "aprobbed_by",
        header: "Approved By"
    },
    {
        key: "credit_card_image",
        header: "Image"
    }
];

const PreapprovalRequestsClientTable = (props) => {
    const [itemBegin, setItemBegin] = useState();
    const [itemEnd, setItemEnd] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState(props.history ? props.history.location.state.notificationInfo : null);
    const [showNotification, setShowNotification] = useState(props.history ? props.history.location.state.showNotification : false);
    const { currentUser } = useContext(AuthContext); 

    const handleOpenImage = (row) => {
        const image = process.env.REACT_APP_BACKEND_API + row.cells[8].value;
        window.open(image, "_blank");
    };

    useEffect(() => {
        if (showNotification === true) {
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    }, [showNotification]);

    const handleCancelPreapproval = () => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${currentUser.email}/cancel_active_preapprovals/`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            }
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Preapproved request cancelled successfully",
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

        setOpenModal(false);
    };

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
            <ComposedModal open={openModal} preventCloseOnClickOutside onClose={() => { setOpenModal(false); }}>
                <ModalHeader label={`Solicitudes de ${props.clientName || ""}`} title="Cancel Preapproval Request" />
                <ModalBody>
                    <p style={{ marginBottom: '1rem' }}>
                        If you cancel the preapproval request the is no guarantee to get the same result in following
                        preapproval requests.
                    </p>
                </ModalBody>
                <ModalFooter danger primaryButtonText="Cancel Preapproval Request" secondaryButtonText="Back" onClick={handleCancelPreapproval} />
            </ComposedModal>
            <DataTable
                rows={props.preapprovals.slice(itemBegin, itemEnd)}
                headers={headers}
                isSortable
            >
                {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                    <TableContainer title="Preapproval Requests" description={`Issued to ${props.clientName || "you"}.`}>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableHeader key={header.key} {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                    <TableHeader />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} {...getRowProps({ row })}>
                                        {row.cells.map((cell) => (
                                            cell.info.header === "credit_card_image" ? (
                                                <TableCell key={cell.id}><Image24 onClick={() => { window.open(cell.value, "_blank") }} /></TableCell>
                                            ) : (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            )
                                        )
                                        )}
                                        <TableCell className="bx--table-column-menu">
                                            <OverflowMenu>
                                                <OverflowMenuItem hasDivider itemText="Open Image" onClick={() => { handleOpenImage(row) }} />
                                                <OverflowMenuItem hasDivider disabled={row.cells[2].value === "No"} isDelete itemText="Cancela Preapproval Request" onClick={() => { setOpenModal(true); }} />
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
                )}
            </DataTable>
        </>
    );
}

export default PreapprovalRequestsClientTable;