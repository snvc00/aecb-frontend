import {
    Form,
    Grid,
    Row,
    Column,
    TextInput,
    Button,
    InlineNotification,
    NotificationActionButton,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientAddressInput from "../../components/ClientAddressInput";

import { Helmet } from "react-helmet";
import { useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateClientAddress = () => {
    const addressRef = useRef();
    const tokenRef = useRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();

    const { curp } = useParams();

    const submitClientAddress = async (e) => {
        e.preventDefault();
        const clientAddress = addressRef.current.getAddress();

        await fetch(`http://localhost:5000/api/clients/${curp}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value
            },
            body: JSON.stringify(clientAddress),
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
                        title: "Domicilio modificado",
                    });
                    setShowNotification(true);
                    e.target.reset();
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

        console.log(clientAddress);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Actualizar Domicilio</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
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
                        <MainHeading>Actualizar Domicilio</MainHeading>
                        <Form onSubmit={submitClientAddress}>
                            <ClientAddressInput ref={addressRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                                ref={tokenRef}
                                required
                            />
                            <Button type="submit">
                                Actualizar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default UpdateClientAddress;