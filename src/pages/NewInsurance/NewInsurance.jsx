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
import InsuranceInput from "../../components/InsuranceInput";

import { Helmet } from "react-helmet";
import { createRef, useState } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewInsurance = () => { 
    const insuranceRef = createRef();

    const [showNotification, setShowNotification] = useState();
    const [notificationInfo, setNotificationInfo] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const insurance = insuranceRef.current.getInsurance();

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/insurances/`, {
            method: "POST",
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
                    title: "Insurance has been registered",
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
                <title>National Bank | Nuevo Seguro</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/insurances">Insurances</BreadcrumbItem>
                            <BreadcrumbItem href="/insurances/register" isCurrentPage>
                                Register
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>New Insurance</MainHeading>
                        {
                            showNotification ?

                                <InlineNotification
                                    kind={notificationInfo.kind}
                                    title={notificationInfo.title}
                                    onCloseButtonClick={() => { setShowNotification(false); }}
                                    actions={
                                        <NotificationActionButton
                                            onClick={() => { window.location.replace("/insurances/registered") }}
                                        >
                                            See Insurances
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <Form onSubmit={handleSubmit}>
                            <InsuranceInput ref={insuranceRef} />
                            <Button type="submit">
                                Add
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewInsurance;