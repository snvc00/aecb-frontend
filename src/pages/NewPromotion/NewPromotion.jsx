import {
    Form,
    Grid,
    Row,
    Column,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    InlineNotification,
    NotificationActionButton,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import PromotionInput from "../../components/PromotionInput";

import { Helmet } from "react-helmet";
import { createRef, useState } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewPromotion = () => { 
    const promotionRef = createRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const promotion = promotionRef.current.getPromotion();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/promotions/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(promotion),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Promoción registrada",
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
                <title>Banco Nacional | Nueva Promoción</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/promociones">Promociones</BreadcrumbItem>
                            <BreadcrumbItem href="/promociones/registrar" isCurrentPage>
                                Registrar
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nueva Promoción</MainHeading>
                        {
                            showNotification ?

                                <InlineNotification
                                    kind={notificationInfo.kind}
                                    title={notificationInfo.title}
                                    onCloseButtonClick={() => { setShowNotification(false); }}
                                    actions={
                                        <NotificationActionButton
                                            onClick={() => { window.location.replace("/promociones/registradas") }}
                                        >
                                            Ver Promociones
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <Form onSubmit={handleSubmit}>
                            <PromotionInput ref={promotionRef} />
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

export default NewPromotion;