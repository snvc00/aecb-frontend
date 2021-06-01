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

import "./NewClient.css";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewClient = () => {
    const generalDataRef = useRef();
    const addressRef = useRef();
    const tokenRef = useRef();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const getClientData = () => {
        const clientGeneralData = generalDataRef.current.getGeneralData();
        const clientAddress = addressRef.current.getAddress();

        return { ...clientGeneralData, ...clientAddress, is_active: true, password: "secure" };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientData = getClientData();

        const response = await fetch("http://localhost:5000/api/clients", {
            method: "POST",
            body: JSON.stringify(clientData),
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value,
            },
        }).catch(error => console.log(error));

        const data = response !== undefined ? await response.json() : { error: { message: "Ha ocurrido un error" } };
        updateNotification(data, e);
    }

    const updateNotification = (data, e) => {
        const errorInData = data.hasOwnProperty("error");

        const kind = errorInData ? "error" : "success";
        const title = errorInData ? data.error.message : "Cliente registrado";

        console.log(errorInData, kind, title);

        if (!errorInData) {
            e.target.reset();
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
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                                ref={tokenRef}
                                required
                            />
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