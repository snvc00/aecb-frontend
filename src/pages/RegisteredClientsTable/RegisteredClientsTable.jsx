import {
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    ComposedModal,
    ModalHeader,
    ModalBody,
    TextInput,
    ModalFooter,
    InlineNotification,

} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientInfoTableSkeleton from "../../components/ClientInfoTableSkeleton";
import ClientInfoTable from "../../components/ClientInfoTable";

import { Helmet } from "react-helmet";

import { useRef, useState } from "react";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredClientsTable = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [clients, setClients] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const tokenRef = useRef();

    const handleModalSubmit = async () => {
        await fetch("http://localhost:5000/api/clients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value
            }
        })
            .then(body => body.json())
            .then(data => {
                if (data.hasOwnProperty("clients")) {
                    console.log(data.clients);
                    setIsAuthenticated(true);
                    const clients = formatClients(data.clients);
                    setClients(clients);
                    sessionStorage.setItem("token", tokenRef.current.value);
                }
                else if (data.hasOwnProperty("error")) {
                    console.log(data.error);
                    setNotificationInfo({
                        kind: "error",
                        title: data.error.message,
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

        setIsModalOpen(false);
    }

    const formatClients = clients => {
        const formattedClients = clients.map(client => {
            const birthdatetime = new Date(client.birthdate).toLocaleString("es-ES", { timeZone: "GMT" }, );
            
            return {
            id: Number(client.id).toString(),
            name: client.name,
            password: client.password,
            curp: client.curp,
            birthdate: birthdatetime.split(" ")[0],
            rfc: client.rfc,
            monthly_income: `$${client.monthly_income} MXN`,
            address: client.address,
            neighborhood: client.neighborhood,
            city: client.city,
            state: client.state,
            is_active: client.is_active ? "Activo" : "Inactivo",
        }});

        return formattedClients;
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuestros Clientes</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes">Clientes</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes/registrados" isCurrentPage>
                                Registrados
                            </BreadcrumbItem>
                        </Breadcrumb><br /><br />
                        <ComposedModal
                            open={isModalOpen}
                            onClose={() => {
                                setNotificationInfo({
                                    kind: "error",
                                    title: "Token no verificado",
                                });
                                setShowNotification(true);
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
                                onRequestSubmit={() => { handleModalSubmit(); }}
                            />
                        </ComposedModal>
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
                        <MainHeading>Nuestros Clientes</MainHeading>
                        {
                            isAuthenticated ?

                                <ClientInfoTable clients={clients} />

                                :

                                <ClientInfoTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredClientsTable;