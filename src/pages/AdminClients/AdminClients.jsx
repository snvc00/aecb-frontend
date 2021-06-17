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
    UserFollow32 as UserFollow,
    UserProfile32 as UserProfile,
    UserMultiple32 as UserMultiple,
} from "@carbon/icons-react";
import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState } from "react";

const styles = {
    margin: "30px 0px",
}

const AdminClients = () => {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Administrar Clientes</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes" isCurrentPage>
                                Clientes
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Administrar Clientes</MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                        <br /><br />
                    </Column>
                </Row>
                {
                    showNotification ?

                        <InlineNotification
                            kind="warning"
                            title="Selecciona un cliente desde el registro"
                            onCloseButtonClick={()=>{ setShowNotification(false); }}
                            actions={
                            <NotificationActionButton
                                onClick={()=>{ window.location.href = "/clientes/registrados" }}
                            >
                                Buscar Cliente
                            </NotificationActionButton>
                          }
                        />

                        :

                        <></>
                }
                <Row>
                    <Column style={styles}>
                        <Link href="/clientes/registrar" renderIcon={UserFollow}>
                            <h3>Registrar Cliente</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link renderIcon={UserProfile} onClick={() => { setShowNotification(true); }}>
                            <h3>Actualizar Información de Cliente</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link href="/clientes/registrados" renderIcon={UserMultiple}>
                            <h3>Clientes Registrados</h3>
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default AdminClients;