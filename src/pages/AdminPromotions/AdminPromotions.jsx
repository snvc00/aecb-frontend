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
    UserCertification32 as UserCertification,
} from "@carbon/icons-react";
import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState } from "react";

const styles = {
    margin: "30px 0px",
}

const AdminPromotions = () => {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            <Helmet>
                <title>National Bank | Admin Promotions</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/promotions" isCurrentPage>
                                Promotions
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Admin Promotions</MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                        <br /><br />
                    </Column>
                </Row>
                {
                    showNotification ?

                        <InlineNotification
                            kind="warning"
                            title="Select a promotion from table"
                            onCloseButtonClick={()=>{ setShowNotification(false); }}
                            actions={
                            <NotificationActionButton
                                onClick={()=>{ window.location.href = "/promotions/registered" }}
                            >
                                Search Promotion
                            </NotificationActionButton>
                          }
                        />

                        :

                        <></>
                }
                <Row>
                    <Column style={styles}>
                        <Link href="/promotions/register" renderIcon={Add}>
                            <h3>Register Promotion</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link renderIcon={Edit} onClick={() => { setShowNotification(true); }}>
                            <h3>Update Promotion</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link href="/promotions/registered" renderIcon={UserCertification}>
                            <h3>Registered Promotions</h3>
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default AdminPromotions;