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
import ClientAddressInput from "../../components/ClientAddressInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { useParams } from "react-router";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateClientAddress = (props) => {
    const addressRef = useRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();

    const { id } = useParams();

    const submitClientAddress = (e) => {
        e.preventDefault();
        const clientAddress = addressRef.current.getAddress();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(clientAddress),
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setNotificationInfo({
                    kind: "success",
                    title: "Address has been updated",
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
                title: String(error),
            });
            setShowNotification(true);
        });
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Update Address</title>
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
                                            onClick={() => { window.location.href = "/clients/registered" }}
                                        >
                                            See Clients
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Update Domicilio</MainHeading>
                        <Form onSubmit={submitClientAddress}>
                            <ClientAddressInput ref={addressRef} client={props.history.location.state.client} />
                            <Button type="submit">
                                Update
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default UpdateClientAddress;