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
import CreditCardSpecificsInput from "../../components/CreditCardSpecificsInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateCreditCard = () => {
    const creditCardSpecificsRef = useRef();
    const tokenRef = useRef();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const creditCardSpecifics = creditCardSpecificsRef.current.getCreditCardSpecifics();

        await fetch(`http://localhost:5000/api/cards/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value
            },
            body: JSON.stringify(creditCardSpecifics),
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
                        title: "Tarjeta de crédito modificada",
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

        console.log(creditCardSpecifics);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Actualizar Tarjeta de Crédito</title>
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
                                            Ver Tarjetas de crédito
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Actualizar Tarjeta de Crédito</MainHeading>
                        <Form onSubmit={handleSubmit}>
                            <CreditCardSpecificsInput ref={creditCardSpecificsRef} />
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

export default UpdateCreditCard;