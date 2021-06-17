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
                <title>Banco Nacional | Administrar Seguros</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/seguros" isCurrentPage>
                                Seguros
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Administrar Seguros</MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                        <br /><br />
                    </Column>
                </Row>
                {
                    showNotification ?

                        <InlineNotification
                            kind="warning"
                            title="Selecciona un seguro desde el registro"
                            onCloseButtonClick={()=>{ setShowNotification(false); }}
                            actions={
                            <NotificationActionButton
                                onClick={()=>{ window.location.href = "/seguros/registrados" }}
                            >
                                Buscar Seguro
                            </NotificationActionButton>
                          }
                        />

                        :

                        <></>
                }
                <Row>
                    <Column style={styles}>
                        <Link href="/seguros/registrar" renderIcon={Add}>
                            <h3>Registrar Seguro</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link renderIcon={Edit} onClick={() => { setShowNotification(true); }}>
                            <h3>Actualizar Información de Seguro</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link href="/seguros/registrados" renderIcon={ManageProtection}>
                            <h3>Seguros Registrados</h3>
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default AdminInsurances;