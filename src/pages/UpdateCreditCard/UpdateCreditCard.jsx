import {
    Form,
    Grid,
    Row,
    Column,
    Button,
    InlineNotification,
    NotificationActionButton,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CreditCardGenericInput from "../../components/CreditCardGenericInput";
import { WatsonHealthWindowBase16 } from "@carbon/icons-react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateCreditCard = (props) => {
    const creditCardGenericsRef = useRef();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const creditCardGenerics = creditCardGenericsRef.current.getCreditCardGenerics();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/cards/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(creditCardGenerics),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Tarjeta de crédito modificada",
                });
                setShowNotification(true);
                e.target.reset();
            }
            else {
                const firstError = Object.keys(data)[0];
                throw `Error with ${firstError}: ${data[firstError]}`;
            }
        })
        .catch(error => {
            setNotificationInfo({
                kind: "error",
                title: error,
            });
            setShowNotification(true);
        });

        window.scrollTo(0, 0);
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
                                            onClick={() => { window.location.href = "/tarjetas/registradas" }}
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
                            <CreditCardGenericInput ref={creditCardGenericsRef} creditCard={props.history.location.state.creditCard} />
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