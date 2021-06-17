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
import { useEffect } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewCreditCard = () => { 
    const creditCardGenericsRef = createRef();
    const creditCardSpecificsRef = createRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();
    const [promotions, setPromotions] = useState();
    const [insurances, setInsurances] = useState();

    const getCreditCardData = () => {
        const creditCardGenerics = creditCardGenericsRef.current.getCreditCardGenerics();
        const creditCardSpecifics = creditCardSpecificsRef.current.getCreditCardSpecifics();
    
        if (creditCardGenerics && creditCardSpecifics) {
            return { ...creditCardGenerics, ...creditCardSpecifics };
        } 
    }

    useEffect(() => {
        
    }, [setPromotions, setInsurances]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const creditCard = getCreditCardData();
        var formData = new FormData();

        formData.append("name", creditCard.name);
        formData.append("min_credit", creditCard.min_credit);
        formData.append("max_credit", creditCard.max_credit);
        formData.append("tier", creditCard.tier);
        formData.append("cat", creditCard.cat);
        formData.append("annual_fee", creditCard.annual_fee);
        
        creditCard.promotions.forEach(promotion => {
            formData.append("promotions", promotion.id);
        });

        creditCard.insurances.forEach(insurance => {
            formData.append("insurances", insurance.id);
        });
        
        formData.append("image", creditCard.image);

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/cards/`, {
            method: "POST",
            headers: {
                "Token": sessionStorage.getItem("token")
            },
            body: formData,
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Tarjeta de crédito registrada",
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
            console.log(error);
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
                                            Ver Tarjetas de Crédito
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <Form onSubmit={handleSubmit}>
                            <CreditCardGenericInput ref={creditCardGenericsRef} />
                            <CreditCardSpecificsInput ref={creditCardSpecificsRef} />
                            <Button type="submit">
                                Añadir
                            </Button>
                        </Form>
                        <br /><br /><br />
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewCreditCard;