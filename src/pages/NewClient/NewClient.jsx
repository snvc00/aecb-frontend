import {
    Form,
    Grid,
    Row,
    Column,
    TextInput,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    InlineNotification,
    NotificationActionButton,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientGeneralDataInput from "../../components/ClientGeneralDataInput";
import ClientAddressInput from "../../components/ClientAddressInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewClient = () => {
    const generalDataRef = useRef();
    const addressRef = useRef();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const getClientData = () => {
        const clientGeneralData = generalDataRef.current.getGeneralData();
        const clientAddress = addressRef.current.getAddress();

        return { ...clientGeneralData, ...clientAddress, active: true };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const clientData = getClientData();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token"),
            },
            body: JSON.stringify(clientData),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                updateNotification("success", "Cliente registrado", e);
            }
            else {
                const firstError = Object.keys(data)[0];
                throw `Error with ${firstError}: ${data[firstError]}`;
            }
        })
        .catch(error => {
            console.log(error);
            updateNotification("error", error, e);
        });
    }

    const updateNotification = (kind, title, event) => {
        if (kind === "success") {
            event.target.reset();
        }

        setShowNotification(true);
        setNotificationInfo({
            kind: kind,
            title: title,
        });

        window.scrollTo(0, 0);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuevo Cliente</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes">Clientes</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes/registro" isCurrentPage>
                                Registrar
                            </BreadcrumbItem>
                        </Breadcrumb><br /><br />
                        <MainHeading>Nuevo Cliente</MainHeading>
                        {
                            showNotification ?

                                <InlineNotification
                                    kind={notificationInfo.kind}
                                    title={notificationInfo.title}
                                    onCloseButtonClick={() => { setShowNotification(false); }}
                                    actions={
                                        <NotificationActionButton
                                            onClick={() => { window.location.href = "/clientes/registrados" }}
                                        >
                                            Ver Clientes
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <Form onSubmit={handleSubmit}>
                            <ClientGeneralDataInput ref={generalDataRef} />
                            <ClientAddressInput ref={addressRef} />
                            <Button type="submit" >
                                Registrar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewClient;