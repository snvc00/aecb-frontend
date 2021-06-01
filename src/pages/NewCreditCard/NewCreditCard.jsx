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
import CreditCardGenericInput from "../../components/CreditCardGenericInput";
import CreditCardSpecificsInput from "../../components/CreditCardSpecificsInput";

import { Helmet } from "react-helmet";
import { createRef, useRef, useState } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewCreditCard = () => { 
    const creditCardGenericsRef = createRef();
    const creditCardSpecificsRef = createRef();
    const tokenRef = useRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();

    const getCreditCardData = () => {
        const creditCardGenerics = creditCardGenericsRef.current.getCreditCardGenerics();
        const creditCardSpecifics = creditCardSpecificsRef.current.getCreditCardSpecifics();
    
        if (creditCardGenerics && creditCardSpecifics) {
            return { ...creditCardGenerics, ...creditCardSpecifics };
        } 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const creditCard = getCreditCardData();

        await fetch("http://localhost:5000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value
            },
            body: JSON.stringify(creditCard),
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
                        title: "Tarjeta de crédito registrada",
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

        console.log(creditCard);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nueva Tarjeta de Crédito</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas">Tarjetas</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas/registrar" isCurrentPage>
                                Registrar
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nueva Tarjeta de Crédito</MainHeading>
                        {
                            showNotification ?

                                <InlineNotification
                                    kind={notificationInfo.kind}
                                    title={notificationInfo.title}
                                    onCloseButtonClick={() => { setShowNotification(false); }}
                                    actions={
                                        <NotificationActionButton
                                            onClick={() => { window.location.href = "/tarjetas/registradas" }}
                                        >
                                            Ver Tarjeras de Crédito
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <Form onSubmit={handleSubmit}>
                            <CreditCardGenericInput ref={creditCardGenericsRef} />
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
                                Añadir
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewCreditCard;