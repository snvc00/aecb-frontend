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
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Auth";

const headers = [
    {
        key: "id",
        header: "ID",
    },
    {
        key: "approved",
        header: "Aprobada",
    },
    {
        key: "active",
        header: "Activa",
    },
    {
        key: "creation_timestamp",
        header: "Fecha y Hora de Creación",
    },
    {
        key: "last_update",
        header: "Última Actualización",
    },
    {
        key: "credit_card_name",
        header: "Tarjeta de Crédito"
    },
    {
        key: "credit_card_max_credit",
        header: "Crédito Máximo"
    },
    {
        key: "aprobbed_by",
        header: "Aprobada Por"
    },
    {
        key: "credit_card_image",
        header: "Imagen"
    }
];

const PreapprovalRequestsClientTable = (props) => {
    const [itemBegin, setItemBegin] = useState();
    const [itemEnd, setItemEnd] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState(props.history ? props.history.location.state.notificationInfo : null);
    const [showNotification, setShowNotification] = useState(props.history ? props.history.location.state.showNotification : false);
    let history = useHistory();
    const { currentUser } = useContext(AuthContext); 

    const handleOpenImage = (row) => {
        console.log(row)
        const image = row.cells[8].value;
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
                    title: "Solicitud cancelada",
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
                <ModalHeader label={`Solicitudes de ${props.clientName || ""}`} title="Cancelación de Solicitud" />
                <ModalBody>
                    <p style={{ marginBottom: '1rem' }}>
                        Una vez que canceles tu solicitud, podrías volver a realizar el proceso, pero no se garantiza
                        obtener el mismo resultado.
                    </p>
                </ModalBody>
                <ModalFooter danger primaryButtonText="Cancelar Solicitud" secondaryButtonText="Regresar" onClick={handleCancelPreapproval} />
            </ComposedModal>
            <DataTable
                rows={props.preapprovals.slice(itemBegin, itemEnd)}
                headers={headers}
                isSortable
            >
                {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                    <TableContainer title="Solicitudes de Preaprobación" description={`Issued to ${props.clientName || ""}`}>
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
                                                <OverflowMenuItem hasDivider itemText="Ver Imagen" onClick={() => { handleOpenImage(row) }} />
                                                <OverflowMenuItem hasDivider disabled={row.cells[2].value === "No"} isDelete itemText="Cancelar Solicitud" onClick={() => { setOpenModal(true); }} />
                                            </OverflowMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination
                            backwardText="Anterior"
                            forwardText="Siguiente"
                            itemsPerPageText="Solicitudes por página:"
                            page={1}
                            pageNumberText="Página"
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