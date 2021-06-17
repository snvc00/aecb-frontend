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
                <title>Banco Nacional | Administrar Promociones</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/promociones" isCurrentPage>
                                Promociones
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Administrar Promociones</MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                        <br /><br />
                    </Column>
                </Row>
                {
                    showNotification ?

                        <InlineNotification
                            kind="warning"
                            title="Selecciona una promoción desde el registro"
                            onCloseButtonClick={()=>{ setShowNotification(false); }}
                            actions={
                            <NotificationActionButton
                                onClick={()=>{ window.location.href = "/promociones/registradas" }}
                            >
                                Buscar Promoción
                            </NotificationActionButton>
                          }
                        />

                        :

                        <></>
                }
                <Row>
                    <Column style={styles}>
                        <Link href="/promociones/registrar" renderIcon={Add}>
                            <h3>Registrar Promoción</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link renderIcon={Edit} onClick={() => { setShowNotification(true); }}>
                            <h3>Actualizar Información de Promoción</h3>
                        </Link>
                    </Column>
                </Row>
                <Row>
                    <Column style={styles}>
                        <Link href="/promociones/registradas" renderIcon={UserCertification}>
                            <h3>Promociones Registradas</h3>
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default AdminPromotions;