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
import PromotionInput from "../../components/PromotionInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdatePromotion = (props) => {
    const promotionRef = useRef();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState({});

    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const promotion = promotionRef.current.getPromotion();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/promotions/${id}/`, {
            method: "PATCH",
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
                        title: "Promotions has been updated",
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
                    title: String(error),
                });
                setShowNotification(true);
            });
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Update Promotion</title>
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
                                            onClick={() => { window.location.replace("/promotions/registered") }}
                                        >
                                            See Promotions
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Update Promotion</MainHeading>
                        <Form onSubmit={handleSubmit}>
                            <PromotionInput ref={promotionRef} promotion={props.history.location.state.promotion} />
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

export default UpdatePromotion;