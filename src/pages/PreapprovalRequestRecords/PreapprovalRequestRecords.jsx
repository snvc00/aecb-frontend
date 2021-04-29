import {
    Grid,
    Row,
    Column,
    ComposedModal,
    ModalHeader,
    ModalBody,
    TextInput,
    ModalFooter,
    ToastNotification,
    Link,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import PreapprovalRequestsTableSkeleton from "../../components/PreapprovalRequestsTableSkeleton";
import PreapprovalRequestsTable from "../../components/PreapprovalRequestsTable";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";

const gridStyles = {
    marginTop: "80px",
};

const PreapprovalRequestRecords = () => {
    const tokenRef = useRef();
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [requests, setRequests] = useState();

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Solicitudes de Preaprobación</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <ComposedModal
                            open
                            onClose={() => {
                                setIsAuthenticated(false);
                            }}
                        >
                            <ModalHeader
                                label="Identificación"
                                title="Ingresa tu Token de Administrador"
                            />
                            <ModalBody>
                                <p style={{ marginBottom: "1rem" }}>
                                    Recuerda el tratar con seguridad esta información, ya que es
                                    de uso exclusivo de personal administrativo.
                </p>
                                <TextInput
                                    data-modal-primary-focus
                                    id="token"
                                    ref={tokenRef}
                                    labelText=""
                                    placeholder="Token de Administrador"
                                    style={{ marginBottom: "1rem" }}
                                    type="password"
                                />
                            </ModalBody>
                            <ModalFooter
                                primaryButtonText="Ingresar"
                                secondaryButtonText="Cancelar"
                            />
                        </ComposedModal>
                        <MainHeading>Solicitudes de Preaprobación</MainHeading>
                        {isAuthenticated === false ? (
                            <Row>
                                <Column sm={2} md={{ span: 4, offset: 6 }}>
                                    <ToastNotification
                                        title="Error de Autenticación"
                                        subtitle="Token de Administrador no válido"
                                        onCloseButtonClick={() => {
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                        style={{ marginBottom: "2rem" }}
                                        caption={
                                            <Link onClick={() => { window.location.reload(); }}>
                                                Intentar de nuevo
                                            </Link>
                                        }
                                    >
                                    </ToastNotification>
                                </Column>
                            </Row>
                        ) : (
                            <></>
                        )}

                        {requests !== undefined ? (
                            <PreapprovalRequestsTable />
                        ) : (
                            <PreapprovalRequestsTableSkeleton />
                        )}
                    </Column>
                </Row>
            </Grid>
        </>
    );
};

export default PreapprovalRequestRecords;
