import Header from "../../components/Header";
import {
    Grid,
    Row,
    Column,
    Link,
    SkeletonPlaceholder,
    InlineNotification,
    NotificationActionButton,
    Breadcrumb,
    BreadcrumbItem,
} from "carbon-components-react";
import {
    Add32 as Add,
    Edit32 as Edit,
    ManageProtection32 as ManageProtection,
} from "@carbon/icons-react";
import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState } from "react";

const styles = {
    margin: "30px 0px",
}

const AdminInsurances = () => {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            <Helmet>
                <title>National Bank | Admin Insurances</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/insurances" isCurrentPage>
                                Insurances
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Admin Insurances</MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                        <br /><br />
                    </Column>
                </Row>
                {
                    showNotification ?

                        <InlineNotification
                            kind="warning"
                            title="Select an insurance from table"
                            onCloseButtonClick={()=>{ setShowNotification(false); }}
                            actions={
                            <NotificationActionButton
                                onClick={()=>{ window.location.href = "/insurances/registered" }}
                            >
                                Search Insurance
                            </NotificationActionButton>
                          }
                        />

                        :

                        <></>
                }
                <Row>
                    <Column style={styles}>
                        <Link href="/insurances/register" renderIcon={Add}>
                            <h3>Register Insurance</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link renderIcon={Edit} onClick={() => { setShowNotification(true); }}>
                            <h3>Update Insurance</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link href="/insurances/registered" renderIcon={ManageProtection}>
                            <h3>Registered Insurances</h3>
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default AdminInsurances;