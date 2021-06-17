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
import InsuranceInput from "../../components/InsuranceInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateInsurance = (props) => {
    const insuranceRef = useRef();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const insurance = insuranceRef.current.getInsurance();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/insurances/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(insurance),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Seguro modificado",
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
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Actualizar Seguro</title>
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
                                            onClick={() => { window.location.replace("/seguros/registrados") }}
                                        >
                                            Ver Seguros
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Actualizar Seguro</MainHeading>
                        <Form onSubmit={handleSubmit}>
                            <InsuranceInput ref={insuranceRef} insurance={props.history.location.state.insurance} />
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

export default UpdateInsurance;